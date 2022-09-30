/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as authUser from "../fixtures/auth-user.json";

describe("Practice Dashboard, after authenticating", () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it("Should render after login", () => {
        cy.viewport(1920, 1080)

        const totalKids = 1;

        const { email, password } = authUser;
        cy.login(email, password);

        cy.visit("/practice");

        const studentCards = cy.get('div.practice-list-card');

        studentCards.should('have.length', totalKids);

        cy.contains("Intervention Dashboard");
    });

    it("Should work with filter list", () => {
        const filterButtons = cy.get('button.student-filter-btn');

        filterButtons.each((btn) => {
            cy.wrap(btn).click().wait(100)
        })

        filterButtons.filter(':contains(Mine)').click()
    })

    it("Should redirect to individual practice page [No ADMIN]", () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('div.practice-list-card').within((card) => {
            cy.wrap(card)
                .get('a')
                .should('have.length', 1)
                .wait(250)
                .click()
                .wait(250)
                .then(() => {
                    expect(stub.getCall(0)).to.be.calledWith('No math problems have been added to the targeted list yet.')
                })

        });
    });

    // TODO: add in after set creator fixed?
});