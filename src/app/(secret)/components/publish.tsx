import React, { useState } from 'react'
import { Doc } from '../../../../convex/_generated/dataModel'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { Check, Copy, Globe } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { toast } from 'sonner'

interface PublishProps {
    document: Doc<"documents">
}

export const Publish = ({ document }: PublishProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false);
    const updateFields = useMutation(api.document.updateFields);

    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/preview/${document._id}`

    const onPublish = () => {
        setIsLoading(true)

        const promise = updateFields({
            id: document._id,
            isPublished: true,
        }).finally(() => setIsLoading(false));

        toast.promise(promise, {
            loading: 'Publishing...',
            success: 'Published successfully',
            error: 'Failed to publish',
        })
    }

    const onUnpublish = () => {
        setIsLoading(true)

        const promise = updateFields({
            id: document._id,
            isPublished: false,
        }).finally(() => setIsLoading(false));

        toast.promise(promise, {
            loading: 'Unpublishing...',
            success: 'Unpublished successfully',
            error: 'Failed to unpublish',
        })
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000)
    }

    return (

        <Popover>
            <PopoverTrigger>
                <Button size={'sm'} variant={"ghost"}>
                    Share
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='w-72'
                align='end'
                alignOffset={8}
                forceMount
            >
                {!document.isPublished ? (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-2">Publish this document</p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others.
                        </span>
                        <Button
                            size={"sm"}
                            className="w-full text-sm"
                            onClick={onPublish}
                            disabled={isLoading}
                        >
                            Publish
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                            <p className="text-xs font-medium text-sky-500">
                                This note is live on web.
                            </p>
                        </div>

                        <div className="flex items-center">
                            <input
                                disabled
                                value={url}
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                            />
                            <Button
                                disabled={copied}
                                onClick={onCopy}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            size={"sm"}
                            className="w-full text-sm"
                            onClick={onUnpublish}
                            disabled={isLoading}
                        >
                            Unpublish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
