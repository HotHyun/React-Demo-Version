import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogIn: (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const Check_LogIn = localStorage.getItem('isLoggedIn'); // localStorage에서 isLoggedIn 이라는 이름을 가진 Item을 가져옴

        if (Check_LogIn === '1') {
            setIsLoggedIn(true); // 만약 Item의 value가 1이라면 setIsLoggedIn을 true로 세팅 -> true에 종속된 컴포넌트만 출력될 것임
        }
    }, []);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1'); // 로그인을 눌렀을 때 localStorage에 isLogggedIn 이름을 가진 Item의 value를 1로 저장
        setIsLoggedIn(true); // isLoggedIn 변수를 true로 설정
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn'); // 로그아웃을 눌렀을 때 localStorage에 isLoggedIn 이름을 가진 Item을 삭제
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogIn: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
