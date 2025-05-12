# Weather
🌦️ Godspeed OpenWeather Plugin

A simple custom data source plugin for Godspeed Framework, using the OpenWeather API to fetch current weather information like temperature, humidity, etc.

📁 Project Structure

weather-service/
├── src/
│   ├── plugins/
│   │   └── datasources/
│   │       └── openweather.ts      # 👈 Our custom datasource plugin
│   ├── datasources/
│   │   └── openweather.yaml        # Plugin config
│   ├── plugins/
│   │   └── index.ts                # Registers the plugin
│   └── ...                         # Other Godspeed files
├── package.json
├── README.md
└── ...
🚀 What This Plugin Does

✅ Calls the OpenWeather API
✅ Accepts a city name like "Delhi"
✅ Returns current weather details (temp, humidity, etc.)

It uses the axios client and fits perfectly into the Godspeed plugin system.

🔧 How to Use

1. Clone the repo
git clone https://github.com/YOUR_USERNAME/weather-service.git
cd weather-service
2. Add your API key
Edit the src/datasources/openweather.yaml file:

type: REST
base_url: https://api.openweathermap.org/data/2.5
auth_type: API_KEY
auth_key: YOUR_API_KEY_HERE
🔑 You can get your free API key from https://openweathermap.org/api
3. Build and Run
npm install
npm run build
npm run preview
If successful, you should see logs like:

[INFO] Loaded datasource config openweather
[INFO] Weather fetched!
🔍 How It Works

The plugin is registered using:

const Type = 'REST';
This means whenever Godspeed sees type: REST in a datasource YAML file, it uses this plugin logic.

The plugin uses axios to hit this endpoint:

GET https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_KEY
And returns the response to your Godspeed app.

🧠 Tip: Changing the Default City

You can change the city dynamically using args.params from your Godspeed function or trigger:

params:
  q: Mumbai
📦 For Developers

Plugin Entry: openweather.ts
This is the main logic.

initClient() → sets up axios
execute() → fetches data using provided method, URL, and query parameters
Plugin Registration: plugins/index.ts
Make sure this line exists:

export * from './datasources/openweather';
🧹 Build Script

The package.json already includes build steps like:

rsync -a ./src/plugins/ ./dist/plugins
This ensures Godspeed can find your plugin when running from the dist folder.

💬 Contributing

Pull requests are welcome! If you find bugs or have suggestions, feel free to open an issue or PR.

📄 License

This project is open-source under the MIT License.

