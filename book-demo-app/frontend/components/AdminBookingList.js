import { useState } from "react";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const defaultIntervals = [10, 20, 30, 40];

export default function AdminSlotManager() {
  const [slotConfig, setSlotConfig] = useState(
    daysOfWeek.map(day => ({
      day,
      isOff: false,
      startTime: "09:00",
      endTime: "17:00",
      interval: 30,
    }))
  );
  const [recurring, setRecurring] = useState(false);

  const handleDayChange = (idx, field, value) => {
    setSlotConfig(prev =>
      prev.map((d, i) =>
        i === idx ? { ...d, [field]: value } : d
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Weekly Slots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slotConfig.map((dayConfig, idx) => (
          <div key={dayConfig.day} className="border rounded p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold">{dayConfig.day}</span>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={dayConfig.isOff}
                  onChange={e =>
                    handleDayChange(idx, "isOff", e.target.checked)
                  }
                />
                <span className="text-sm">Weekly Off</span>
              </label>
            </div>
            {!dayConfig.isOff && (
              <>
                <div className="flex gap-2 items-center">
                  <label>From:</label>
                  <input
                    type="time"
                    value={dayConfig.startTime}
                    onChange={e =>
                      handleDayChange(idx, "startTime", e.target.value)
                    }
                  />
                  <label>To:</label>
                  <input
                    type="time"
                    value={dayConfig.endTime}
                    onChange={e =>
                      handleDayChange(idx, "endTime", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Interval:</label>
                  <select
                    value={dayConfig.interval}
                    onChange={e =>
                      handleDayChange(idx, "interval", Number(e.target.value))
                    }
                  >
                    {defaultIntervals.map(intv => (
                      <option key={intv} value={intv}>{intv} min</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center my-4">
        <input
          type="checkbox"
          checked={recurring}
          onChange={e => setRecurring(e.target.checked)}
        />
        <span>Apply these timings to all future weeks/years</span>
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => {
          alert("Settings saved! (implement backend)");
        }}
      >
        Save Settings
      </button>
    </div>
  );
}