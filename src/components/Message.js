import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return (
        <div className="flex flex-row">
            <div className="text-sm mr-2 w-20">
            {photoURL ? (
                <img src={photoURL} alt="Avatar" width={45} height={45} />
            ) : null }
            { displayName ? <p className="text-xs">{displayName}</p> : null}
            </div>
            <div>
            {createdAt ?.seconds ? (
                <span className="text-xs">
                    {formatRelative(new Date(createdAt.seconds * 1000), new Date()
                    )}
                </span>
            ) : null}
            <p>{text}</p>
            </div>
        </div>
            )
        }


export default Message;
