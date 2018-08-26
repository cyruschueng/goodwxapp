/// <reference types="react" />
import React from 'react';
export default class BasicDemo extends React.Component<any, any> {
    private dataBlob;
    private sectionIDs;
    private rowIDs;
    constructor(props: any);
    _genData: (pIndex?: number) => void;
    onEndReached: (_event: any) => void;
    renderSectionHeader: (sectionData: any) => JSX.Element;
    render(): JSX.Element;
}
export declare const title = "ListView";
export declare const description = "ListView example";
