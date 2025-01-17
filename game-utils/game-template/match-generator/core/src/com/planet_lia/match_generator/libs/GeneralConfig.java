package com.planet_lia.match_generator.libs;

import java.util.ArrayList;
import java.util.Collections;

public class GeneralConfig {
    /**
     * A name of the game that will display on top of debug viewer.
     * Eg. Game Template
     */
    public String gameNamePretty;

    /**
     * A name of the game that corresponds to the name of the folder
     * eg. game-template
     */
    public String gameName;

    /**
     * Width of the debug view that is displayed while the match is generating
     */
    public int debugViewWidth;

    /**
     * Height  of the debug view that is displayed while the match is generating
     */
    public int debugViewHeight;

    /**
     * How many game logic updates happen per second
     */
    public int ticksPerSecond;

    /**
     * How long do bots have to connect (in seconds)
     * before being disqualified. Measured form the
     * time the bot server has started.
     */
    public float connectingBotsTimeout;

    /**
     * Time (in seconds) that a bot has to respond
     * after the first update
     */
    public float botFirstResponseTimeout;

    /**
     * Time (in seconds) that a bot has to respond
     * after each update except for the first one
     */
    public float botResponseTimeout;

    /**
     * How many times can a bot not respond in time
     * until it is disqualified.
     */
    public int maxTimeoutsPerBot;

    /**
     * Limit to how much time does the bot have to respond
     * to all requests in a match.
     */
    public float botResponseTotalDurationMax;

    /**
     * How many game logic updates happen before one
     * update to all bots is sent.
     *
     * If ticksPerSecond is set to 30 and gameUpdatesPerBotsUpdate
     * is set to 3, bots will receive game updates 10 times per second.
     */
    public int gameUpdatesPerBotsUpdate;

    /**
     * List of allowed team formats that specify how many
     * bots can be in one match and how they are split in teams.
     */
    public TeamFormat[] allowedTeamFormats;

    /**
     * Returns ArrayList of allowed numbers of bots
     * Eg. [2,4,8] means that 2, 4 or 8 bots must be provided
     * to the match-generator and that this many must connect
     * before the generation can start
     */
    public boolean isNumberOfBotsAllowed(int numberOfBots) {
        for (TeamFormat format : allowedTeamFormats) {
            if (numberOfBots == format.getNumberOfBots()) {
                return true;
            }
        }
        return false;
    }
}

class TeamFormat {
    /**
     * Defines a format in which bots can be split in teams.
     * Eg. if game supports 5 bots, this are valid formats:
     * - 1:1:1:1:1
     * - 2:3
     * - 1,1,1:2
     * - ...
     * Format 2:3 means that first 2 bots will be in team 0
     * and next 3 bots in team 1
     */
    public String format;

    /**
     * Weight with which you want this format to be chosen.
     * This is used on Planet Lia servers to pick a format
     * and with that numbers of bots to play the match.
     */
    public int weight;

    TeamFormat(String format, int weight) {
        this.format = format;
        this.weight = weight;
    }

    int getNumberOfBots() {
        int numberOfBots = 0;

        String[] teams = this.format.split(":");
        for (String team : teams) {
            numberOfBots += Integer.parseInt(team);
        }

        return numberOfBots;
    }
}