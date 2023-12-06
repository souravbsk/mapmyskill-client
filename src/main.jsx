import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
import ShowStepperProvider from "./Providers/ShowSteperProvider.jsx";
import FormStepNameProvider from "./Providers/FormStepNameProvider.jsx";
import HireTutorStepperProvider from "./Providers/HireTutorStepperProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormStepNameProvider>
      <HireTutorStepperProvider>
        <ShowStepperProvider>
          <RouterProvider router={router} />
        </ShowStepperProvider>
      </HireTutorStepperProvider>
    </FormStepNameProvider>
  </React.StrictMode>
);
