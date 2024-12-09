import App from './App.tsx'
import store from './redux/store.ts'
import themeOverride from './themes/overrideTheme.ts'

import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';

import './index.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';



createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider theme={themeOverride}>
            <ModalsProvider>
                <BrowserRouter>
                    <Notifications />
                    <App />
                </BrowserRouter>
            </ModalsProvider>
        </MantineProvider>
    </Provider>
)
