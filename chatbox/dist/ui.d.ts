import React from 'react';

interface IChatBoxAdmin {
}
declare function ChatBoxAdmin({}: IChatBoxAdmin): JSX.Element;

interface IChatBoxWidget {
    themeColor?: string;
    textColor?: string;
    autoMessage?: null | string | React.ReactElement;
    title?: null | string | React.ReactElement;
    description?: null | string | React.ReactElement;
    showOnInitial?: boolean;
    children?: React.ReactElement;
}
declare function ChatBox({ themeColor, textColor, showOnInitial, }: IChatBoxWidget): JSX.Element;

export { ChatBoxAdmin, ChatBox as ChatBoxWidget };
