package team5.ibe.models.graphql.mappers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import team5.ibe.models.graphql.PromotionDTO;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class PromotionMapper {

    public ArrayList<PromotionDTO> toDTOList(String promotionsJsonString, Gson gson){
        JsonObject body = gson.fromJson(promotionsJsonString, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonArray listPromotions = data.get("listPromotions").getAsJsonArray();
        Type promotionDTOListType = new TypeToken<ArrayList<PromotionDTO>>(){}.getType();
        return gson.fromJson(listPromotions.toString(), promotionDTOListType);
    }
}
