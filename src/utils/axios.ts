import axios, { AxiosError, AxiosResponse } from 'axios';
import { userStore } from '@store/userStore';
import FileDownload from 'js-file-download';

const getToken=()=>{
   const { accessToken,refreshToken } = userStore.getState();

   return { accessToken, refreshToken };
}

enum ContentTypes {
  JSON = 'application/json',
  MULTIPART = 'multipart/form-data',
}

export enum FileTypes {
  PDF = 'application/pdf',
  ZIP = 'application/zip',
}

const createHeaders = (token?: string | null | boolean) => {
  const {accessToken,refreshToken} = getToken();

  return {
    'Content-Type': ContentTypes.JSON,
    Authorization: token === true ? `Bearer ${accessToken}` : undefined,
    refreshToken
  };
};

const createFormDataHeaders = (token?: string | null | boolean) => {
  const {accessToken,refreshToken} = getToken();

  return {
    'Content-Type': ContentTypes.MULTIPART,
    Authorization: token === true ? `Bearer ${accessToken}` : undefined,
    refreshToken
  };
};

export const POST = async (
  uri: string,
  payload: any,
  token: string | null | boolean = true,
  apiType: ContentTypes.JSON | ContentTypes.MULTIPART = ContentTypes.JSON
) =>
  axios.post(uri, payload, {
    headers:
      apiType === ContentTypes.JSON
        ? createHeaders(token)
        : createFormDataHeaders(token),
  });

export const GET = async (
  uri: string,
  token: string | null | boolean = true
) => {
  const header = createHeaders(token);

  const response = await axios.get(uri, {
    headers: header,
  });

  return response;
};

export const DOWNLOAD = async (
  uri: string,
  token: string | null | boolean = true,
  fileName?: string,
  fileType: FileTypes.ZIP | FileTypes.PDF = FileTypes.ZIP,
  popUpNativeSaveWindowPrompt = true
): Promise<{
  file: File;
  response: AxiosResponse<Blob>;
  fileId?: string;
}> => {
  try {
    const header = createHeaders(token);

    const response = await axios.get<Blob>(uri, {
      headers: header,
      responseType: 'blob',
    });
    const contentType = response.headers['content-type'] ?? fileType; // priority to the fileName passed as argument
    const contentDisposition = response.headers['content-disposition']; // deprioritize the fileType passed as argument
    const { filename: attachedFileName = 'unknown', id } = extractKeyValueFromContentDisposition<{
      filename: string;
      id?: string;
    }>(contentDisposition);
    const finalFileName = fileName ?? attachedFileName ?? 'unknown';

    if (popUpNativeSaveWindowPrompt) {
      FileDownload(response.data, finalFileName, contentType);
    }
    const file = new File([response.data], finalFileName, {
      type: contentType,
    });
    return { response, file, fileId: id };
  } catch (e) {
    if (e instanceof Blob) {
      const json: {
        message: string;
        error: string;
        statusCode: number;
      } = JSON.parse(await e.text());
      throw new AxiosError(json.message, json.statusCode.toString());
    }
    throw e;
  }
};

export const PUT = async (
  uri: string,
  payload: any,
  token: string | null | boolean = true,
  apiType: ContentTypes.JSON | ContentTypes.MULTIPART = ContentTypes.JSON
) => {
  return axios.put(uri, payload, {
    headers:
      apiType === ContentTypes.JSON
        ? createHeaders(token)
        : createFormDataHeaders(token),
  });
};

export const PATCH = async (
  uri: string,
  payload?: any,
  token: string | null | boolean = true,
  apiType: ContentTypes.JSON | ContentTypes.MULTIPART = ContentTypes.JSON
) => {
  return axios.patch(uri, payload, {
    headers:
      apiType === ContentTypes.JSON
        ? createHeaders(token)
        : createFormDataHeaders(token),
  });
};

export const DELETE = async (
  uri: string,
  token: string | null | boolean = true
) =>
  axios.delete(uri, {
    headers: createHeaders(token),
  });

export const REGISTER_STATUS_GLOBAL_HANDLER = (
  callback: (status: number) => void
) => {
  return axios.interceptors.response.use(
    (response) => {
      callback(response.status);
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;

        callback(status);
        return Promise.reject(data);
      }
      return Promise.reject(error);
    }
  );
};


const extractKeyValueFromContentDisposition = <
  T extends Record<string, string>
>(
  string: string
): Partial<T> & { type?: string } => {
  if (!string) return {}
  const tokens = string.split(';');
  const result: Record<string, string> = {};
  if (tokens[0] !== 'inline' && tokens[0] !== 'attachment') {
    throw new Error('Invalid content disposition');
  }
  result['type'] = tokens[0];
  for (let i = 1; i < tokens.length; i++) {
    const keyValue = tokens[i].split('=');
    if (keyValue.length > 1) {
      const value = keyValue[1].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        result[keyValue[0].trim()] = value.slice(1, -1);
      } else {
        result[keyValue[0].trim()] = value;
      }
    }
  }
  return result as Partial<T> & { type?: string };
};
