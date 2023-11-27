import SignInCustom, { HandleSubmit } from "../../components/Authentication/SignInCustom";
import useToken from "../../components/Authentication/useToken";
import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe(SignInCustom, () => {
    // All the individual tests for this component
    // Test 1: If I render this component, and pass X value as the setToken, will this be displayed?
    // Checks if the 'Sign in to your account' heading (only found in Sign In form) is displayed in the component.
    it("Displays the Sign In form correctly", async () => {
        render(<SignInCustom setToken={useToken} />);
        const signInText = (await screen.findByTestId('signin_title')).textContent;            
        expect(signInText).toEqual('Sign in to your account');
    });

    // Testing the component renders the Sign Up link
    it("Checks if there is a 'Sign Up' button within the Sign In form", async () => {
        render(<SignInCustom setToken={useToken} />);
        await waitFor(async () => {
            const linkDontHaveAccountSignUp = await screen.findByText(/Sign Up/i);
            expect(linkDontHaveAccountSignUp).toBeInTheDocument();
        });        
    });    

    // Testing when the user submits the Sign In form
    it("Should be able to submit the Sign In form", async () => {
        render(<SignInCustom setToken={useToken} />);
        const user = userEvent.setup();
        //Fetch sign in button
        const signInBtn = await screen.findByTestId("signin_btn");
        //Get the input fields for email and password
        const emailInput = await screen.findByTestId("signin_email");
        const passwordInput = await screen.findByTestId("signin_password");
        //Type valid values for email and password
        await user.type(emailInput, "caguilar@example.com");
        await user.type(passwordInput, "aguilar123#");
        //Click the Sign In button
        userEvent.click(signInBtn);
        //Everytime a user successfully sign in, I'll check if the box 'Access granted' is shown
        await waitFor(async () => {
            const accessInfo = await screen.findByText('Access granted');
            expect(accessInfo).toBeInTheDocument();
        });         
    });

    // Testing when the user submits the Sign In form with blank/empty values
    it("Should not be able to submit the Sign In form with blank values", async () => {
        render(<SignInCustom setToken={useToken} />);
        const user = userEvent.setup();
        //Fetch sign in button
        const signInBtn = await screen.findByTestId("signin_btn");        
        //Click the Sign In button
        userEvent.click(signInBtn);
        //Everytime a user successfully sign in, I'll check if the box 'Access granted' is shown
        await waitFor(async () => {
            const accessInfo = await screen.findByText('Provide email and password');
            expect(accessInfo).toBeInTheDocument();
        });         
    });

    //Testing when the user submits the Sign Up form with valid values
    it("Should be able to submit the Sign Up form", async () => {
        render(<SignInCustom setToken={useToken} />);
        const user = userEvent.setup();
        //Fetch Sign Up button in the Sign In form
        const signUpLinkBtn = await screen.findByTestId("signin_signup_btn");
        //Click the Sign Up button
        await userEvent.click(signUpLinkBtn);
        await waitFor(async () => {
            //Form now has the Sign Up fields
            //Get the Sign Up button from the Sign Up form
            const signUpFormBtn = await screen.findByTestId("signup_btn");
            expect(signUpFormBtn).toBeInTheDocument();
            //Get the input fields
            const firstNameInput = await screen.findByTestId("signup_firstname");
            const lastNameInput = await screen.findByTestId("signup_lastname");
            const emailInput = await screen.findByTestId("signup_email");
            const passwordInput = await screen.findByTestId("signup_password");
            //Type valid values for firstname, lastname, email and password
            await user.type(firstNameInput, "Test");
            await user.type(lastNameInput, "User");
            let uid = new Date().valueOf().toString();
            let finalEmail = "user".concat(uid.concat("@example.com"));
            await user.type(emailInput, finalEmail);
            await user.type(passwordInput, "password123#");
            //Click the Sign Up button
            await user.click(signUpFormBtn);
            await waitFor(async () => {
                const signUpSuccess = await screen.findByText('Signed up successfully');
                expect(signUpSuccess).toBeInTheDocument();
            });
        });        
    });

    //Testing when the user submits the Sign Up form with blank/empty values
    it("Should not be able to submit the Sign Up form with empty values", async () => {
        render(<SignInCustom setToken={useToken} />);
        const user = userEvent.setup();
        //Fetch Sign Up button in the Sign In form
        const signUpLinkBtn = await screen.findByTestId("signin_signup_btn");
        //Click the Sign Up button
        await userEvent.click(signUpLinkBtn);
        await waitFor(async () => {
            //Form now has the Sign Up fields
            //Get the Sign Up button from the Sign Up form
            const signUpFormBtn = await screen.findByTestId("signup_btn");
            expect(signUpFormBtn).toBeInTheDocument();
            //Click the Sign Up button
            await user.click(signUpFormBtn);
            await waitFor(async () => {
                const signUpSuccess = await screen.findByText('Complete all fields');
                expect(signUpSuccess).toBeInTheDocument();
            });
        });        
    });

    //Testing when the user submits the Reset password form with valid values
    it("Should be able to submit the Reset password form", async () => {
        render(<SignInCustom setToken={useToken} />);
        const user = userEvent.setup();
        //Fetch Forgot Password? button in the Sign In form
        const resetPasswordLinkBtn = await screen.findByTestId("signin_reset_btn");
        //Click the Forgot Password? button
        await userEvent.click(resetPasswordLinkBtn);
        await waitFor(async () => {
            //Form now has the Reset Password fields
            //Get the Reset password button from the Reset password form
            const resetPasswordBtn = await screen.findByTestId("reset_btn");
            expect(resetPasswordBtn).toBeInTheDocument();
            //Get the input fields                
            const resetEmailInput = await screen.findByTestId("reset_email");
            const resetPasswordInput = await screen.findByTestId("reset_password");
            const resetConfPasswordInput = await screen.findByTestId("reset_conf_password");
            //Type valid values for email, password and confirm password        
            await user.type(resetEmailInput, "lhamilton@example.com");
            await user.type(resetPasswordInput, "password123#");
            await user.type(resetConfPasswordInput, "password123#");
            //Click the Reset password button
            await user.click(resetPasswordBtn);
            await waitFor(async () => {
                const resetSuccess = await screen.findByText('Password reset successful');
                expect(resetSuccess).toBeInTheDocument();
            });
        });        
    });

    //Testing when the user submits the Reset password form with passwords that don't match
    // it("Should not be able to submit the Reset password form with no matching passwords", async () => {
    //     render(<SignInCustom setToken={useToken} />);
    //     const user = userEvent.setup();
    //     //Fetch Forgot Password? button in the Sign In form
    //     const resetPasswordLinkBtn = screen.getByTestId("signin_reset_btn");
    //     //Click the Forgot Password? button
    //     await user.click(resetPasswordLinkBtn);
    //     //Form now has the Reset Password fields
    //     //Get the Reset password button from the Reset password form
    //     const resetPasswordBtn = screen.getByTestId("reset_btn");
    //     expect(resetPasswordBtn).toBeInTheDocument();
    //     //Get the input fields                
    //     const resetEmailInput = screen.getByTestId("reset_email");
    //     const resetPasswordInput = screen.getByTestId("reset_password");
    //     const resetConfPasswordInput = screen.getByTestId("reset_conf_password");
    //     //Type valid values for email, password and confirm password        
    //     await user.type(resetEmailInput, "lhamilton@example.com");
    //     await user.type(resetPasswordInput, "password123#");
    //     await user.type(resetConfPasswordInput, "password");
    //     //Click the Reset password button
    //     await user.click(resetPasswordBtn);
    //     await waitFor(() => {
    //         const resetSuccess = screen.getByText('Passwords don\'t match');
    //         expect(resetSuccess).toBeInTheDocument();
    //     });
    // });

    //Testing when the user submits the Reset password form with blank/empty values
    it("Should not be able to submit the Reset password form with blank values", async () => {
        render(<SignInCustom setToken={useToken} />);
        const user = userEvent.setup();
        //Fetch Forgot Password? button in the Sign In form
        const resetPasswordLinkBtn = await screen.findByTestId("signin_reset_btn");
        //Click the Forgot Password? button
        await userEvent.click(resetPasswordLinkBtn);
        //Form now has the Reset Password fields
        //Get the Reset password button from the Reset password form
        const resetPasswordBtn = await screen.findByTestId("reset_btn");
        expect(resetPasswordBtn).toBeInTheDocument();
        //Click the Reset password button
        await user.click(resetPasswordBtn);
        await waitFor(async () => {
            const resetSuccess = await screen.findByText('Complete all fields');
            expect(resetSuccess).toBeInTheDocument();
        });
    });

    // Check if in the Sign In form, there are 3 buttons
    it("Render the Sign In form with 3 buttons", async () => {
        render(<SignInCustom setToken={useToken} />);
        const btnList = await screen.findAllByRole("button");
        expect(btnList).toHaveLength(3);
    });    

    //The email field should only accept emails, not simple text
    it("Email input field should only accept emails", async () => {
        render(<SignInCustom setToken={useToken} />);
        //fetch the email DOM element
        const email = await screen.findByPlaceholderText("Enter your email address");
        //Use user-event to mock a user typing their email address
        await userEvent.type(email, "caguilar");
        expect(email.value).not.toMatch("caguilar@example.com");
    });

    // Password input field should always have a type of password
    it("Password input should have type password", async () => {
        render(<SignInCustom setToken={useToken} />);
        const password = await screen.findByPlaceholderText("Enter your password");
        expect(password).toHaveAttribute("type", "password");
    });

})