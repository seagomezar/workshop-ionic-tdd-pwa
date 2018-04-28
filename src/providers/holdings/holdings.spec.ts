import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HoldingsProvider, Holding } from './holdings';
import { IonicStorageModule } from '@ionic/storage';

describe('Provider: Holdings Provider', () => {

    const fakeHolding: Holding = {
        crypto: 'BTC',
        currency: 'USD',
        amount: 10,
        value: null
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [], // Components to test
            providers: [
                HoldingsProvider // Providers to test
            ],
            imports: [
                HttpClientModule,
                IonicStorageModule.forRoot()
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

    it('Debería añadir un nuevo holding', inject([HoldingsProvider], (holdingsProvider) => {
        expect(holdingsProvider.holdings[0]).toBeUndefined;
        holdingsProvider.addHolding(fakeHolding);
        expect(holdingsProvider.holdings[0].crypto).toBe('BTC');
    }));

    it('Debería añadir dos holdings y el tamaño del store debería ser dos', inject([HoldingsProvider], (holdingsProvider) => {
        holdingsProvider.addHolding(fakeHolding);
        holdingsProvider.addHolding(fakeHolding);
        expect(holdingsProvider.holdings.length).toBe(2);
    }));

    it('Debería poder eliminar un nuevo holding', inject([HoldingsProvider], (holdingsProvider) => {
        expect(holdingsProvider.holdings[0]).toBeNull;
        holdingsProvider.addHolding(fakeHolding);
        expect(holdingsProvider.holdings[0].crypto).toBe('BTC');
        holdingsProvider.removeHolding(fakeHolding);
        expect(holdingsProvider.holdings[0]).toBeNull;
    }));

    it('Debería poder guardar los holdings en el storage de ionic', inject([HoldingsProvider], (holdingsProvider) => {
        expect(holdingsProvider.holdings[0]).toBeNull;
        holdingsProvider.addHolding(fakeHolding);
        holdingsProvider.saveHoldings();
        holdingsProvider.removeHolding(fakeHolding);
        expect(holdingsProvider.holdings[0]).toBeNull;
        holdingsProvider.loadHoldings();
        expect(holdingsProvider.holdings[0]).not.toBeNull;
    }));



});