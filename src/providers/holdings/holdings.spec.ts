import { TestBed, inject, async } from '@angular/core/testing';
import { HoldingsProvider } from './holdings';

describe('Provider: Holdings Provider', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [], // Components to test
            providers: [
                HoldingsProvider // Providers to test
            ],
            imports: [] // Dependencies we need to test declarations and providers
        }).compileComponents();
    }));

    afterEach(() => {

    });

    it('El provider debería estar definido', () => {
        expect(HoldingsProvider).toBeDefined();
    });
});