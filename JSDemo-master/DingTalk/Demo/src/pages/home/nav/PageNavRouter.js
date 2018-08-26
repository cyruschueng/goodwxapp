import { Route } from 'react-keeper'
import Page from './PageNav';

export default {
    page: Page,
    route: () => (
        <div>
            <Route index component={Page} path= '/' >

            </Route>
        </div>)
};
