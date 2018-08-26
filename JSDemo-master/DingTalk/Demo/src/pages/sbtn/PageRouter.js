import { Route } from 'react-keeper'
import Page from './PageSbtn';

export default {
    page: Page,
    route: () => (
        <div>
            <Route index component={Page} path= '/sbtn' >

            </Route>
        </div>)
};
