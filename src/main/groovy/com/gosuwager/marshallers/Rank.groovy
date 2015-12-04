package com.gosuwager.marshallers

/**
 * Created by aaronhenshaw on 11/25/15.
 */
class Rank {

    public static rankToString(Integer rank) {
        switch(rank) {
            case 1:
                return 'Master';
            case 2:
                return 'Diamond';
            case 3:
                return 'Platinum';
            case 4:
                return 'Gold';
            case 5:
                return 'Silver';
            case 6:
                return 'Bronze';
        }
    }

    public static rankToInteger(String rank) {
        switch(rank.toLowerCase().trim()) {
            case 'master':
                return 1;
            case 'diamond':
                return 2;
            case 'platinum':
                return 3;
            case 'gold':
                return 4;
            case 'silver':
                return 5;
            case 'bronze':
                return 6;
        }
    }
}
