'use client'

import React from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'

interface DocumentIdPageProps {
    params: {
        documentId: Id<'documents'>;
    }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
    return (
        <div>{params.documentId}</div>
    )
}

export default DocumentIdPage
