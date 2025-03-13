// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
describe('Injected', () => {
    let iframe;
    async function createSandbox() {
        const url = new URL('./injected/injected.generated.js', import.meta.url);
        iframe = document.createElement('iframe');
        const { promise, resolve } = Promise.withResolvers();
        iframe.src = new URL('../../ui/components/docs/recorder_injected/basic.html', import.meta.url).toString();
        iframe.onload = resolve;
        document.body.append(iframe);
        await promise;
        const iframeDocument = iframe.contentDocument;
        {
            const { promise, resolve } = Promise.withResolvers();
            const script = iframeDocument.createElement('script');
            script.src = url.toString();
            script.onload = resolve;
            iframeDocument.body.append(script);
            await promise;
        }
        const iframeWindow = iframe.contentWindow;
        {
            iframeWindow.DevToolsRecorder
                .startRecording({
                // We don't have the access to the actual bindings here. Therefore, the test assumes
                // that the markup is explicitly annotated with the following attributes.
                getAccessibleName: (element) => {
                    if (!('getAttribute' in element)) {
                        return '';
                    }
                    return element.getAttribute('aria-name') || '';
                },
                getAccessibleRole: (element) => {
                    if (!('getAttribute' in element)) {
                        return 'generic';
                    }
                    return element.getAttribute('aria-role') || '';
                },
            }, {
                debug: false,
                allowUntrustedEvents: true,
                selectorTypesToRecord: [
                    'xpath',
                    'css',
                    'text',
                    'aria',
                    'pierce',
                ],
            });
        }
        return iframeWindow;
    }
    afterEach(() => {
        iframe?.remove();
    });
    it('should get selectors for an element', async () => {
        const window = await createSandbox();
        const selectors = window.DevToolsRecorder.recordingClientForTesting.getSelectors(window.document.querySelector('#buttonNoARIA'));
        assert.deepEqual(selectors, [
            [
                '#buttonNoARIA',
            ],
            [
                'xpath///*[@id="buttonNoARIA"]',
            ],
            [
                'pierce/#buttonNoARIA',
            ]
        ]);
    });
});
export {};
//# sourceMappingURL=injected.test.js.map