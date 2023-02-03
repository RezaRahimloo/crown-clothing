
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
    auth,
    signInWithGooglePopup,
    singInWithGoogleRedirect,
    createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";



const SignIn = () => {
    // useEffect(() => {
    //     async function executeRedirect(){
    //         const response =  await getRedirectResult(auth);//auth is singleton
    //         console.log(response);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //             console.log(userDocRef)
    //         }
    //     }
    //     executeRedirect();
    // }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        //console.log(user);
    }
    // const logGoogleRedirectUser = async () => {
    //     const { user } = await singInWithGoogleRedirect();
    //     console.log(user);
    //     //console.log(user);
    // } 

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google
            </button>
            <SignUpForm/>
            {/* <button onClick={logGoogleRedirectUser}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default SignIn;