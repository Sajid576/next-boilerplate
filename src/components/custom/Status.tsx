import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';
import React from 'react'

export default function Status({title}: {title: string}) {
    switch (title) {
      case "active":
        return <Badge className={cn("bg-green-500")}>Published</Badge>;
      case "approved":
        return <Badge className={cn("bg-green-600")}>Approved</Badge>;
      case "delivered":
        return <Badge className={cn("bg-green-700")}>Delivered</Badge>;
      case "completed":
        return <Badge className={cn("bg-green-700")}>Completed</Badge>;
      case "received":
        return <Badge className={cn("bg-green-800")}>Delivered</Badge>;
      case "inactive":
        return <Badge className={cn("bg-yellow-600")}>Draft</Badge>;
      case "pending":
        return <Badge className={cn("bg-yellow-600")}>Pending</Badge>;
      default:
        break;
    }
  
}
