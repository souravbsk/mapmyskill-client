import React, { useContext } from 'react';
import AuthHeader from '../Shared/AuthHeader/AuthHeader';
import { Outlet } from 'react-router-dom';
import AuthFooter from '../Shared/AuthFooter/AuthFooter';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { ReqStepperProvider } from '../Providers/HireTutorStepperProvider';



const RequestTutorLayout = () => {

    const { step } = useContext(ReqStepperProvider)

    return (
        <div className=''>
            <AuthHeader></AuthHeader>

            <div className="progress-bar mt-12">
                <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={step} alternativeLabel>
                        <Step >
                            <StepLabel>Hire tutor</StepLabel>
                        </Step>
                        <Step >
                            <StepLabel>Contact Information</StepLabel>
                        </Step>
                        <Step >
                            <StepLabel>Verification</StepLabel>
                        </Step>
                    </Stepper>
                </Box>
            </div>

            <Outlet>
            </Outlet>
            <AuthFooter></AuthFooter>

        </div>
    );
};

export default RequestTutorLayout;