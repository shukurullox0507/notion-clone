import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation'
import React from 'react'
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { Loader } from '@/components/ui/loader';
import { MenuIcon } from 'lucide-react';
import { Title } from './title';

interface NavbarProps {
    isCollapsed: boolean;
    reset: () => void;
}

export const Navbar = ({ isCollapsed, reset }: NavbarProps) => {
    const params = useParams();

    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<"documents">,
    })

    if (document === undefined) {
        return (
            <nav className='bg-background px-3 w-full flex items-center justify-between'>
                <Loader />
                <div className='flex items-center gap-x-2'>
                    <Loader />
                </div>
            </nav>
        )
    }

    if (document === null) {
        return null;
    }
    return (
        <nav className='bg-background px-3 py-2 w-full flex items-center gap-x-4'>
            {isCollapsed && (
                <MenuIcon
                    className='w-6 h-6 text-muted-foreground'
                    role="button"
                    onClick={reset}
                />
            )}
            <div className='flex items-center justify-between w-full'>
                <Title document={document}/>
                <div className='flex items-center gap-x-2'></div>
            </div>
        </nav>
    )
}
