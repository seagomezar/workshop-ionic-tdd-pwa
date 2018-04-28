import { TestBed, inject, async } from '@angular/core/testing';
import { HoldingsProvider } from './holdings';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage';
import { MockBackend } from '@angular/http/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


describe('Provider: Holdings Provider', () => {

  const fakeHolding = {
    crypto: 'BTC',
    currency: 'USD',
    amount: 10,
    value: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        HoldingsProvider,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        IonicStorageModule.forRoot()]
    }).compileComponents();
  }));

  afterEach(() => {

  });

  it('El provider debería estar definido', () => {
    expect(HoldingsProvider).toBeDefined();
  });

  it('Inicialmente los holdings deberían estar vacios', inject([HoldingsProvider], (holdingsProvider) => {
    expect(holdingsProvider.holdings[0]).toBeNull;
  }));

  it('Debería poder añadir un nuevo holding', inject([HoldingsProvider], (holdingsProvider) => {
    expect(holdingsProvider.holdings[0]).toBeNull;
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

  it('Debería cargar los holdings que tengo guardados', inject([HoldingsProvider], (holdingsProvider) => {
    spyOn(holdingsProvider, 'fetchPrices');
    holdingsProvider.loadHoldings();
    expect(holdingsProvider.fetchPrices).not.toHaveBeenCalled();
    holdingsProvider.addHolding(fakeHolding);
    expect(holdingsProvider.fetchPrices).toHaveBeenCalled();
  }));

  it('Debería poder verificar los holdings', inject([HoldingsProvider, MockBackend], (holdingsProvider, mockBackend) => {

    const mockAnswer = [
      {
        ticker: {
          base: "BTC",
          target: "USD",
          price: 443,
          volume: "31720.1493969300",
          change: "0.3766203596"
        },
        timestamp: 1399490941,
        success: true,
        error: ""
      }
    ];
    spyOn(Observable.prototype, "pipe").and.returnValue(
      Observable.of(mockAnswer)
    );

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockAnswer
      })));
    });
    holdingsProvider.verifyHoldings(fakeHolding).subscribe((response) => {
      expect(response[0].ticker.price).toBe(443);
    });

  }));

  it('Debería poder obtener los holdings sin refresher', (inject([HoldingsProvider, MockBackend], (holdingsProvider, mockBackend) => {
    expect(holdingsProvider.holdings[0]).toBeNull;
    holdingsProvider.addHolding(fakeHolding);
    expect(holdingsProvider.holdings[0].crypto).toBe('BTC');
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: [{ price: 1000 }]
      })));
    });

    holdingsProvider.fetchPrices();
    //expect(holdingsProvider.holdings[0].value).toBe(1000);
    expect(holdingsProvider.holdings[0].value).toBe(null);

  })));

  it("Debería poder obtener los holdings con refresher",
    inject([HoldingsProvider, MockBackend], (holdingsProvider, mockBackend) => {
      expect(holdingsProvider.holdings[0]).toBeNull;
      holdingsProvider.addHolding(fakeHolding);
      expect(holdingsProvider.holdings[0].crypto).toBe("BTC");

      const mockAnswer = [
        {
          ticker: {
            base: "BTC",
            target: "USD",
            price: 443,
            volume: "31720.1493969300",
            change: "0.3766203596"
          },
          timestamp: 1399490941,
          success: true,
          error: ""
        }
      ];

      spyOn(Observable.prototype, "pipe").and.returnValue(
        Observable.of(mockAnswer)
      );

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: [{ price: 1000 }]
            })
          )
        );
      });
      const refresher = {
        complete: function () { }
      };
      holdingsProvider.fetchPrices(refresher);
      //expect(holdingsProvider.holdings[0].value).toBe(1000);
      expect(holdingsProvider.holdings[0].value).toBe(443);
    })
  );

  it("Debería generar error al obtener los holdings con refresher",
    inject([HoldingsProvider, MockBackend], (holdingsProvider, mockBackend) => {
      expect(holdingsProvider.holdings[0]).toBeNull;
      holdingsProvider.addHolding(fakeHolding);
      expect(holdingsProvider.holdings[0].crypto).toBe("BTC");

      spyOn(Observable.prototype, "pipe").and.returnValue(
        Observable.throw("Error")
      );

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: [{ price: 1000 }]
            })
          )
        );
      });
      const refresher = {
        complete: function () { }
      };
      holdingsProvider.fetchPrices(refresher);
      //expect(holdingsProvider.holdings[0].value).toBe(1000);
      expect(holdingsProvider.pricesUnavailable).toBe(true);
    })
  );


});