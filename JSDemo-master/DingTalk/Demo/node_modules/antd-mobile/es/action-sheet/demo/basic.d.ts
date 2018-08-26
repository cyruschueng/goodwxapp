/// <reference types="react" />
import React from 'react';
export default class Test extends React.Component<any, any> {
    state: {
        clicked: string;
        text: string;
    };
    render(): JSX.Element;
    showActionSheet: () => void;
    showShareActionSheet: () => void;
}
export declare const title = "ActionSheet";
export declare const description = "ActionSheet example";
