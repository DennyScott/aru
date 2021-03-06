/**
 * Aru
 * Manga Command
 */

// Setup files and modules
const axios = require('axios')

module.exports = function (bot, logger) {
  bot.registerCommand('manga', (msg, args) => {
    axios
      .get(`https://kitsu.io/api/edge/manga?filter[text]=${args}`)
      .then(response => {
        const embed = {
          author: {
            name: response.data.data[0].attributes.titles.en,
            icon_url:
              'https://pbs.twimg.com/profile_images/807964865511862278/pIYOVdsl_400x400.jpg',
            url: `https://kitsu.io/manga/${response.data.data[0].attributes.slug}`
          },
          title: 'Manga Information:',
          color: 16765404,
          fields: [
            {
              name: 'Episode Count',
              value:
                response.data.data[0].attributes.episodeCount != null
                  ? response.data.data[0].attributes.episodeCount.toString()
                  : 'None',
              inline: true
            },
            {
              name: 'Episode Length',
              value:
                response.data.data[0].attributes.episodeLength != null
                  ? response.data.data[0].attributes.episodeLength.toString()
                  : 'None',
              inline: true
            },
            {
              name: 'Started Airing',
              value:
                response.data.data[0].attributes.startDate != null
                  ? response.data.data[0].attributes.startDate
                  : 'None',
              inline: true
            },
            {
              name: 'Finished Airing',
              value:
                response.data.data[0].attributes.endDate != null
                  ? response.data.data[0].attributes.endDate
                  : 'None',
              inline: true
            },
            {
              name: 'Kitsu.io Rating',
              value:
                response.data.data[0].attributes.averageRating != null
                  ? response.data.data[0].attributes.averageRating.toString()
                  : 'None',
              inline: true
            },
            {
              name: 'Age Rating',
              value:
                response.data.data[0].attributes.ageRating != null
                  ? response.data.data[0].attributes.ageRating
                  : 'None',
              inline: true
            },
            {
              name: 'Synopsis',
              value:
                response.data.data[0].attributes.synopsis != null
                  ? response.data.data[0].attributes.synopsis
                  : 'None',
              inline: false
            }
          ],
          thumbnail: {
            url: response.data.data[0].attributes.posterImage.medium
          },
          timestamp: new Date(),
          footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
          }
        }

        // Create message
        bot.createMessage(msg.channel.id, {
          embed: embed
        })

        // Log command usage
        logger.info(
          new Date() +
            ': ' +
            'Manga command used by ' +
            msg.author.username +
            '#' +
            msg.author.discriminator +
            ' in ' +
            msg.channel.guild.name +
            ' with args ' +
            args
        )
      })
      .catch(error => {
        // Create message
        bot.createMessage(msg.channel.id, 'Manga not found :slight_frown:')
        
        // Log command usage
        logger.info(
          new Date() +
            ': ' +
            'FAILURE: Manga command used by ' +
            msg.author.username +
            '#' +
            msg.author.discriminator +
            ' in ' +
            msg.channel.guild.name +
            ' with args ' +
            args
        )
      })
  })
}
