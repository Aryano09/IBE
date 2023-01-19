package team5.ibe.models.graphql.mappers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import team5.ibe.models.graphql.NightlyRatesDTO;
import team5.ibe.services.GraphQLServiceImplementation;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class NightlyRatesMapper {
    private static final Logger logger = LoggerFactory.getLogger(GraphQLServiceImplementation.class);

    public static ArrayList<NightlyRatesDTO> toDTOList(String roomRatesJsonString, Gson gson){
        JsonObject body = gson.fromJson(roomRatesJsonString, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonArray listRoomTypes = data.get("listRoomTypes").getAsJsonArray();
        JsonObject room_Rates_List = listRoomTypes.get(0).getAsJsonObject();
        JsonArray room_Rates = room_Rates_List.get("room_rates").getAsJsonArray();
        ArrayList<JsonObject> nightlyRatesList = new ArrayList<>();
        for(Integer index = 0; index<room_Rates.size(); index++)
        {
            JsonObject NightRateObject = room_Rates.get(index).getAsJsonObject();
            JsonObject nightlyRates = NightRateObject.get("room_rate").getAsJsonObject();
            nightlyRatesList.add((nightlyRates));
        }
        Type roomRatesDTOListType = new TypeToken<List<NightlyRatesDTO>>(){}.getType();
        return gson.fromJson(nightlyRatesList.toString(), roomRatesDTOListType);
    }
}
