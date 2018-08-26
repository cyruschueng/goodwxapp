import { Route } from 'react-keeper'
import Page from './PageDetailone';

export default {
    page: Page,
    route: () => (
        <div>
            <Route index component={Page} path= '/detailone' >

            </Route>
        </div>)
};
