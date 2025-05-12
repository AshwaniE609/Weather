import { GSContext, GSDataSource, GSStatus, PlainObject } from "@godspeedsystems/core";
import axios from "axios";

export default class OpenWeatherDataSource extends GSDataSource {
  async initClient(): Promise<PlainObject> {
    const client = axios.create({
      baseURL: this.config.base_url || "https://api.openweathermap.org/data/2.5"
    });
    return client;
  }

  
  
  async execute(ctx: GSContext, args: PlainObject): Promise<GSStatus> {
    try {
      const method = args.meta?.method || 'get';
      const url = args.meta?.url;
      const data = args.body || {};
  
      const response = await this.client.request({
        method,
        url,
        data: method === 'get' ? undefined : data,
      });
  
      const responseData = response.data;
      console.log("📦 FINAL API RESPONSE DATA:", response.data);

      // Force format to match expected Swagger schema
      return new GSStatus(true, 200, 'Request successful', {
        message: response.data.message,
        status: response.data.status || 'success'
      });
  
    } catch (err: any) {
      return new GSStatus(false, err.response?.status || 500, 'Request failed', {
        error: err.message
      });
    }
    //   console.log("📦 FINAL API RESPONSE DATA:", response.data);

  
    //   // 🚨 Ensure the returned value is an object (not string, HTML, etc.)
    //   if (typeof responseData !== 'object') {
    //     return new GSStatus(false, 500, 'Expected object, but got something else', {
    //       error: 'Invalid response type from external API',
    //       original: responseData,
    //     });
    //   }
  
    //   return new GSStatus(true, 200, 'Request successful', responseData);
    // } catch (err: any) {
    //   return new GSStatus(false, err.response?.status || 500, 'Request failed', {
    //     error: err.message,
    //   });
    // }
  }
  
  // async execute(ctx: GSContext, args: PlainObject): Promise<GSStatus> {
  //   try {
  //     const city = args.meta?.city || "London";
  //     const apiKey = this.config.api_key;

  //     const response = await this.client.get("/weather", {
  //       params: {
  //         q: city,
  //         appid: apiKey
  //       }
  //     });

  //     return new GSStatus(true, 200, "Weather fetched!", response.data);
  //   } catch (err: any) {
  //     ctx.childLogger.error("Error fetching weather", err);
  //     return new GSStatus(false, 500, "Failed to fetch weather", { error: err.message });
  //   }
  // }
}

const SourceType = "DS";
const Type = 'REST';
const CONFIG_FILE_NAME = "openweather"; // this links to your YAML
const DEFAULT_CONFIG = {
  base_url: "https://api.openweathermap.org/data/2.5",
  api_key: "027535cb5e8f9cc8283ec06315a2b272"
};

export {
  OpenWeatherDataSource as DataSource,
  SourceType,
  Type,
  CONFIG_FILE_NAME,
  DEFAULT_CONFIG
};

