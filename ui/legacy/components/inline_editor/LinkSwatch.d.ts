export interface BaseLinkSwatchRenderData {
    text: string;
    title: string;
    showTitle: boolean;
    isDefined: boolean;
    onLinkActivate: (linkText: string) => void;
}
declare class BaseLinkSwatch extends HTMLElement {
    #private;
    protected readonly shadow: ShadowRoot;
    protected onLinkActivate: (linkText: string, event: MouseEvent | KeyboardEvent) => void;
    connectedCallback(): void;
    set data(data: BaseLinkSwatchRenderData);
    get linkElement(): HTMLElement | undefined;
    private render;
}
export interface LinkSwatchRenderData {
    isDefined: boolean;
    text: string;
    onLinkActivate: (linkText: string) => void;
    jslogContext: string;
}
export declare class LinkSwatch extends HTMLElement {
    protected readonly shadow: ShadowRoot;
    set data(data: LinkSwatchRenderData);
    protected render(data: LinkSwatchRenderData): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-base-link-swatch': BaseLinkSwatch;
        'devtools-link-swatch': LinkSwatch;
    }
}
export {};
