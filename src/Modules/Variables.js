import Utils from "./Utils.js";

const userVariables = (user, prefix = "user") => {
    return [
        createVariable(`${prefix}-id`, user.id),
        createVariable(`${prefix}-displayname`, user.displayName),
        createVariable(`${prefix}-username`, user.user.username),
        createVariable(`${prefix}-tag`, user.user.tag),
        createVariable(`${prefix}-mention`, `<@${user.id}>`),
        createVariable(`${prefix}-pfp`, user.user.displayAvatarURL({ forceStatic: false })),
        createVariable(`${prefix}-createdate`, `<t:${Math.floor(user.user.createdTimestamp / 1000)}:D>`),
        createVariable(`${prefix}-joindate`, `<t:${Math.floor((user.joinedTimestamp ?? 0) / 1000)}:D>`),
        createVariable(`${prefix}-badges`, Utils.getUserBadges(user).join(", ") || "None"),
        createVariable(`${prefix}-roles`, user.roles.cache.filter(x => x.id != user.guild.roles.everyone.id)
            .map((r) => `<@&${r.id}>`).join(", ")),
        createVariable(`${prefix}-isBoosting`, user.premiumSince ? "Yes" : "No"),
        createVariable(`${prefix}-banner`, user.user.bannerURL({ forceStatic: false }) || "https://i.zorino.in/KYVDiscord_zZVBeqlAEv.png"),
    ];
};

const channelVariables = (channel, prefix = "channel") => {
    return [
        createVariable(`${prefix}-id`, channel.id),
        createVariable(`${prefix}-name`, channel.name),
        createVariable(`${prefix}-mention`, channel.toString()),
        createVariable(`${prefix}-type`, channel.type),
        createVariable(`${prefix}-createdate`, `<t:${Math.floor((channel.createdTimestamp ?? 0) / 1000)}:D>`),
    ];
};

const roleVariables = (role, prefix = "role") => {
    return [
        createVariable(`${prefix}-id`, role.id),
        createVariable(`${prefix}-name`, role.name),
        createVariable(`${prefix}-mention`, role.toString()),
        createVariable(`${prefix}-createdate`, `<t:${Math.floor(role.createdTimestamp / 1000)}:D>`),
        createVariable(`${prefix}-color`, role.color),
        createVariable(`${prefix}-hexColor`, role.hexColor),
        createVariable(`${prefix}-position`, role.rawPosition),
        createVariable(`${prefix}-icon`, role.iconURL() ?? "https://cdn-icons-png.flaticon.com/512/2522/2522053.png"),
    ];
};

const botVariables = (bot, prefix = "bot") => {
    return [
        createVariable(`${prefix}-id`, bot.user?.id ?? "Unknown"),
        createVariable(`${prefix}-username`, bot.user?.username ?? "Unknown"),
        createVariable(`${prefix}-tag`, bot.user?.tag ?? "Unknown#0000"),
        createVariable(`${prefix}-mention`, `<@${bot.user?.id}>`),
        createVariable(`${prefix}-pfp`, bot.user?.displayAvatarURL({ forceStatic: false }) ?? "https://i.imgur.com/ptTG24J.png"),
    ];
};

const guildVariables = (guild, prefix = "guild") => {
    return [
        createVariable(`${prefix}-id`, guild.id),
        createVariable(`${prefix}-name`, guild.name),
        createVariable(`${prefix}-icon`, guild.iconURL({ forceStatic: false }) || "https://cdn.discordapp.com/embed/avatars/0.png"),
        createVariable(`${prefix}-banner`, guild.bannerURL() || "https://i.zorino.in/KYVDiscord_zZVBeqlAEv.png"),
        createVariable(`${prefix}-boosts`, guild.premiumSubscriptionCount),
        createVariable(`${prefix}-level`, guild.premiumTier),
        createVariable(`${prefix}-max-members`, guild.maximumMembers),
        createVariable(`${prefix}-createdate`, `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`),
        createVariable(`${prefix}-members`, guild.members.cache.filter((m) => !m.user.bot).size),
        createVariable(`${prefix}-bots`, guild.members.cache.filter((m) => m.user.bot).size),
        createVariable(`${prefix}-total-members`, guild.memberCount),
        createVariable(`${prefix}-total-roles`, guild.roles.cache.size),
        createVariable(`${prefix}-total-channels`, guild.channels.cache.size),
        createVariable(`${prefix}-total-emojis`, guild.emojis.cache.size),
        createVariable(`${prefix}-total-stickers`, guild.stickers.cache.size),
        createVariable(`${prefix}-online-members`, guild.members.cache.filter((member) => member.presence?.status !== "offline").size),
        createVariable(`${prefix}-online-bots`, guild.members.cache.filter((member) => member.user.bot && member.presence?.status !== "offline").size),
        createVariable(`${prefix}-online-humans`, guild.members.cache.filter((member) => !member.user.bot && member.presence?.status == "online").size),
        createVariable(`${prefix}-idle-humans`, guild.members.cache.filter((member) => !member.user.bot && member.presence?.status == "idle").size),
        createVariable(`${prefix}-dnd-humans`, guild.members.cache.filter((member) => !member.user.bot && member.presence?.status == "dnd").size),
        createVariable(`${prefix}-offline-humans`, guild.members.cache.filter((member) => !member.user.bot && member.presence?.status == "offline").size),
    ];
};

const createVariable = (searchFor, replaceWith) => {
    if (!searchFor || replaceWith === undefined || [searchFor, replaceWith].some(k => typeof k === "object" && isNaN(k))) {
        console.error("Invalid createVariable values. searchFor: " + searchFor + " | replaceWith: " + replaceWith);
        return { searchFor: new RegExp(`{${searchFor || "MISSING"}}`, "g"), replaceWith: replaceWith || "MISSING" };
    }

    const searchForRegex = new RegExp(`{${searchFor}}`, "g");

    return {
        searchFor: searchForRegex,
        replaceWith,
    };
};

export { userVariables, channelVariables, roleVariables, botVariables, guildVariables, createVariable };
