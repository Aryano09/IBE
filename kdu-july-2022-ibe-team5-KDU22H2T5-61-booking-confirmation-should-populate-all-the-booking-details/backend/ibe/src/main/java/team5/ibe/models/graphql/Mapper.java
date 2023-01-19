package team5.ibe.models.graphql;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;

public class Mapper {
    private Gson gson = new Gson();

    public ArrayList<RoomTypeRoomRateDTO> getRoomTypeRoomRateDtoList(String responseJson){
        JsonObject body = gson.fromJson(responseJson, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonArray listRoomTypes = data.get("listRoomTypes").getAsJsonArray();
        Type roomTypeRoomRateDtoListType = new TypeToken<ArrayList<RoomTypeRoomRateDTO>>(){}.getType();
        return gson.fromJson(listRoomTypes.toString(), roomTypeRoomRateDtoListType);
    }

    public ArrayList<RoomDTO> getRoomsFromListRoomsJSON(String roomIdsByRoomTypeIdJSON){
        JsonObject body = gson.fromJson(roomIdsByRoomTypeIdJSON, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonArray listRooms = data.get("listRooms").getAsJsonArray();
        Type roomListType = new TypeToken<ArrayList<RoomDTO>>(){}.getType();
        return gson.fromJson(listRooms.toString(), roomListType);
    }

    public ArrayList<PromotionDTO> toPromotionsDTOList(String promotionsJsonString, Gson gson){
        JsonObject body = gson.fromJson(promotionsJsonString, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonArray listPromotions = data.get("listPromotions").getAsJsonArray();
        Type promotionDTOListType = new TypeToken<ArrayList<PromotionDTO>>(){}.getType();
        return gson.fromJson(listPromotions.toString(), promotionDTOListType);
    }

    public ArrayList<ListRoomRateDTO> toListRoomRateDTOs(String listRoomRateJSON, Gson gson){
        JsonObject body = gson.fromJson(listRoomRateJSON, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonArray listRoomRates = data.get("listRoomRates").getAsJsonArray();
        Type listRoomRatesDTOsType = new TypeToken<ArrayList<ListRoomRateDTO>>(){}.getType();
        return gson.fromJson(listRoomRates.toString(), listRoomRatesDTOsType);
    }
}
