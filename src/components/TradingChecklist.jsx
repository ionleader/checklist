import React, { useState } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const TradingChecklist = () => {
  const [activeInstrument, setActiveInstrument] = useState('nq');
  const [checks, setChecks] = useState({
    nq: {
      nqTrend: false,
      nqVolume: false,
      nqRsi: false,
      nqSupport: false,
      nqRisk: false
    },
    cl: {
      clTrend: false,
      clInventory: false,
      clVolume: false
    }
  });

  const [notes, setNotes] = useState('');

  const checkItems = {
    nq: {
      nqTrend: "1sd/VWAP oder HTF Lvl, CVA",
      nqVolume: "Context ok",
      nqRsi: "5 Minuten Pause nach 1 Loser?",
      nqSupport: "starkes Lvl?",
      nqRisk: "entry geplant?"
    },
    cl: {
      clTrend: "PB_Bounce oder sehr starker 2. Test? oder starker fade",
      clInventory: "price action ok?",
      clVolume: "Limit Order?"
    }
  };

  const resetChecklist = () => {
    setChecks({
      nq: Object.keys(checks.nq).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      cl: Object.keys(checks.cl).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    });
    setNotes('');
  };

  const currentChecks = checks[activeInstrument];
  const currentCheckItems = checkItems[activeInstrument];
  
  const allChecksComplete = Object.values(currentChecks).every(v => v);
  const percentComplete = (Object.values(currentChecks).filter(v => v).length / Object.values(currentChecks).length * 100).toFixed(0);

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>Trading Plan Checklist</CardTitle>
          <button 
            onClick={resetChecklist}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveInstrument('nq')}
            className={`px-4 py-2 rounded ${
              activeInstrument === 'nq' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            NQ Futures
          </button>
          <button
            onClick={() => setActiveInstrument('cl')}
            className={`px-4 py-2 rounded ${
              activeInstrument === 'cl' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            CL Futures
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(currentCheckItems).map(([key, label]) => (
            <div 
              key={key}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => setChecks(prev => ({
                ...prev,
                [activeInstrument]: {
                  ...prev[activeInstrument],
                  [key]: !prev[activeInstrument][key]
                }
              }))}
            >
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                currentChecks[key] ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}>
                {currentChecks[key] ? 
                  <Check className="h-4 w-4 text-white" /> : 
                  <X className="h-4 w-4 text-gray-300" />
                }
              </div>
              <span className={currentChecks[key] ? 'text-gray-800' : 'text-gray-600'}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <textarea
            placeholder="Additional trade notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 text-center">
          <div className="text-2xl font-bold mb-2">
            {activeInstrument.toUpperCase()}: {percentComplete}% Complete
          </div>
          {allChecksComplete ? (
            <div className="text-green-500 font-medium">
              All {activeInstrument.toUpperCase()} criteria met - Ready to trade!
            </div>
          ) : (
            <div className="text-orange-500 font-medium">
              Complete all {activeInstrument.toUpperCase()} checks before trading
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingChecklist;