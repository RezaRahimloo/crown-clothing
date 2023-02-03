
import {
    auth,
    signInWithGooglePopup,
    singInWithGoogleRedirect,
    createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss'

const Authentication = () => {
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
        <div className="authentication-container">
            
            <SignInForm/>
            <SignUpForm/>

            {/* <button onClick={logGoogleRedirectUser}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default Authentication;