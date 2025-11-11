import React, { useState } from 'react';
const BottomAppBar = () => {

    const [pathname, setPathname] = useState('');
    const router = useRouter()

    useEffect(() => {
        setPathname(window.location.pathname)
    }, []);

    const navigateTo = (path: string) => {
        router.push(path);
    }

    

    

}