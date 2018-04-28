import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HoldingsProvider, Holding } from './holdings';

describe('Provider: Holdings Provider', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [], // Components to test
            providers: [
                HoldingsProvider // Providers to test
            ],
            imports: [
                HttpClientModule
            ] // Dependencies we need to test declarations and providers
        }).compileComponents();
    });

    afterEach(() => {

    });

    it('El provider debería estar definido', () => {
        expect(HoldingsProvider).toBeDefined();
    });

    it('Inicialmente el store de holdings debería de estar vació', inject([HoldingsProvider], (holdingsProvider) => {
        expect(holdingsProvider.holdings[0]).toBeUndefined;
    }));

});