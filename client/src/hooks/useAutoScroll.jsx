import React from 'react';

const useAutoScroll = (messages) => {
    const containerRef = React.useRef(null);
    const [isAtBottom, setIsAtBottom] = React.useState(true);
    const prevScrollHeight = React.useRef(0);
    
    const checkIfAtBottom = () => {
        const chatContainer = containerRef.current;
        if (chatContainer) {
            const isAtBottom = chatContainer.scrollTop === 0;
            setIsAtBottom(isAtBottom);
        }
    };

    React.useEffect(() => {
        const chatContainer = containerRef.current;
        if (chatContainer) {
            checkIfAtBottom();
        }
    }, [messages]);

    React.useLayoutEffect(() => {
        const chatContainer = containerRef.current;
        if (chatContainer && !isAtBottom) {
            const currentScrollHeight = chatContainer.scrollHeight;
            chatContainer.scrollTop -= currentScrollHeight - prevScrollHeight.current;
        }
        prevScrollHeight.current = chatContainer.scrollHeight;
    }, [messages, isAtBottom]);

    return containerRef;
};

export default useAutoScroll;
