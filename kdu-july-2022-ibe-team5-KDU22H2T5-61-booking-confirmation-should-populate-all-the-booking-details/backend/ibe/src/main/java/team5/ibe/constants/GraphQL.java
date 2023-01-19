package team5.ibe.constants;

import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class GraphQL {
    public static HashSet<String> standardRatesTitles(){
        HashSet<String> standardRatesTitles = Stream.of("SENIOR_CITIZEN_DISCOUNT", "KDU Membership Discount", "Long weekend discount", "Military personnel discount", "Upfront payment discount", "Weekend discount").collect(Collectors.toCollection(HashSet::new));
        return standardRatesTitles;
    }
}
