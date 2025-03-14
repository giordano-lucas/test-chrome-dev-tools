// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithLocale } from '../../testing/EnvironmentHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describeWithLocale('GenericIssue', () => {
    const mockModel = new MockIssuesModel([]);
    function createProtocolIssueWithoutDetails() {
        return {
            code: "GenericIssue" /* Protocol.Audits.InspectorIssueCode.GenericIssue */,
            details: {},
        };
    }
    function createProtocolIssueWithDetails(genericIssueDetails) {
        return {
            code: "GenericIssue" /* Protocol.Audits.InspectorIssueCode.GenericIssue */,
            details: { genericIssueDetails },
        };
    }
    beforeEach(() => {
        // The component warns if not provided with an issue that has details, but
        // we don't need that noise in the test output.
        sinon.stub(console, 'warn');
    });
    it('adds an incorrect form label use issue with valid details', () => {
        const issueDetails = {
            errorType: "FormLabelForNameError" /* Protocol.Audits.GenericIssueErrorType.FormLabelForNameError */,
            frameId: 'main',
            violatingNodeId: 1,
            violatingNodeAttribute: 'attribute',
        };
        const issue = createProtocolIssueWithDetails(issueDetails);
        const genericIssues = IssuesManager.GenericIssue.GenericIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(genericIssues, 1);
        const genericIssue = genericIssues[0];
        assert.strictEqual(genericIssue.getCategory(), "Generic" /* IssuesManager.Issue.IssueCategory.GENERIC */);
        assert.strictEqual(genericIssue.primaryKey(), `GenericIssue::FormLabelForNameError-(${'main'})-(1)-(attribute)-(no-request)`);
        assert.strictEqual(genericIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
        assert.isNotNull(genericIssue.getDescription());
    });
    it('adds an incorrect form label use issue without details', () => {
        const inspectorIssueWithoutGenericDetails = createProtocolIssueWithoutDetails();
        const genericIssues = IssuesManager.GenericIssue.GenericIssue.fromInspectorIssue(mockModel, inspectorIssueWithoutGenericDetails);
        assert.isEmpty(genericIssues);
    });
    it('adds a CORB/ORB issue with valid details', () => {
        const issueDetails = {
            errorType: "ResponseWasBlockedByORB" /* Protocol.Audits.GenericIssueErrorType.ResponseWasBlockedByORB */,
            request: { requestId: 'blabla' },
        };
        const issue = createProtocolIssueWithDetails(issueDetails);
        const genericIssues = IssuesManager.GenericIssue.GenericIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(genericIssues, 1);
        const genericIssue = genericIssues[0];
        assert.strictEqual(genericIssue.getCategory(), "Generic" /* IssuesManager.Issue.IssueCategory.GENERIC */);
        assert.strictEqual(genericIssue.primaryKey(), 'GenericIssue::ResponseWasBlockedByORB-(undefined)-(undefined)-(undefined)-(blabla)');
        assert.strictEqual(genericIssue.getKind(), "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */);
        assert.isNotNull(genericIssue.getDescription());
    });
});
//# sourceMappingURL=GenericIssue.test.js.map