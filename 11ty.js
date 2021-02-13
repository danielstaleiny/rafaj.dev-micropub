import YAML from 'yaml'

export const EleventyPreset = class {
  constructor() {
    this.id = '11ty'
    this.name = '11ty'
  }

  /**
   * Post types
   *
   * @returns {object} Post types config
   */
  get postTypes() {
    return [
      {
        type: 'article',
        name: 'Article',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
        media: {
          path: 'src/_img/{yyyy}-{MM}-{dd}-{filename}',
          url: '_img/{yyyy}-{MM}-{dd}-{filename}',
        },
      },
      {
        type: 'note',
        name: 'Note',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
      },
      {
        type: 'photo',
        name: 'Photo',
        post: {
          path: 'src/p/{slug}.md',
          url: 'p/{slug}',
        },
        media: {
          path: 'src/_img/{yyyy}-{MM}-{dd}-{filename}',
          url: '_img/{yyyy}-{MM}-{dd}-{filename}',
        },
      },
      {
        type: 'video',
        name: 'Video',
        post: {
          path: 'src/v/{slug}.md',
          url: 'v/{slug}',
        },
        media: {
          path: 'src/_img/{yyyy}-{MM}-{dd}-{filename}',
          url: '_img/{yyyy}-{MM}-{dd}-{filename}',
        },
      },
      {
        type: 'audio',
        name: 'Audio',
        post: {
          path: 'src/audio/{slug}.md',
          url: 'audio/{slug}',
        },
        media: {
          path: 'src/_img/{yyyy}-{MM}-{dd}-{filename}',
          url: '_img/{yyyy}-{MM}-{dd}-{filename}',
        },
      },
      {
        type: 'bookmark',
        name: 'Bookmark',
        post: {
          path: 'src/bk/{slug}.md',
          url: 'bk/{slug}',
        },
      },
      {
        type: 'checkin',
        name: 'Checkin',
        post: {
          path: 'src/ck/{slug}.md',
          url: 'ck/{slug}',
        },
      },
      {
        type: 'event',
        name: 'Event',
        post: {
          path: 'src/evt/{slug}.md',
          url: 'evt/{slug}',
        },
      },
      {
        type: 'rsvp',
        name: 'Reply with RSVP',
        post: {
          path: 'src/rsvp/{slug}.md',
          url: 'rsvp/{slug}',
        },
      },
      {
        type: 'reply',
        name: 'Reply',
        post: {
          path: 'src/reply/{slug}.md',
          url: 'reply/{slug}',
        },
      },
      {
        type: 'repost',
        name: 'Repost',
        post: {
          path: 'src/r/{slug}.md',
          url: 'r/{slug}',
        },
      },
      {
        type: 'like',
        name: 'Like',
        post: {
          path: 'src/l/{slug}.md',
          url: 'l/{slug}',
        },
      },
    ]
  }

  /**
   * Post template
   *
   * @param {object} properties Post data variables
   * @returns {string} Rendered template
   */
  postTemplate(properties) {
    let content
    if (properties.content) {
      content =
        properties.content.text || properties.content.html || properties.content
      content = `${content}\n`
    } else {
      content = ''
    }

    properties = {
      layout: 'blog.njk',
      ...(properties['post-type'] && { type: properties['post-type'] }),
      date: properties.published.substring(0, 10), // substring to take only published date
      ...(properties.name && { title: properties.name }),
      ...(!properties.name &&
        properties.content && {
          title: `${(properties.content.text
            ? properties.content.text
            : properties.content
          ).substring(0, 25)}...`,
        }),
      ...(properties.summary && {
        description: properties.summary || properties.name || '',
      }),
      ...(properties.summary && { excerpt: properties.summary }),
      tags: [
        'blog',
        'post',
        ...(properties.category
          ? Array.isArray(properties.category)
            ? properties.category
            : [properties.category]
          : []),
      ],
      ...(properties.category && { category: properties.category }),
      ...(properties.start && { start: properties.start }),
      ...(properties.end && { end: properties.end }),
      ...(properties.rsvp && { rsvp: properties.rsvp }),
      ...(properties.location && { location: properties.location }),
      ...(properties.checkin && { checkin: properties.checkin }),
      ...(properties.audio && { audio: properties.audio }),
      ...(properties.photo && { photo: properties.photo }),
      ...(properties.video && { video: properties.video }),
      ...(properties['bookmark-of'] && {
        'bookmark-of': properties['bookmark-of'],
      }),
      ...(properties['like-of'] && { 'bookmark-of': properties['like-of'] }),
      ...(properties['repost-of'] && { 'repost-of': properties['repost-of'] }),
      ...(properties['in-reply-to'] && {
        'in-reply-to': properties['in-reply-to'],
      }),
      ...(properties['post-status'] === 'draft' && { draft: true }),
      ...(properties.visibility && { visibility: properties.visibility }),
      ...(properties.syndication && { syndication: properties.syndication }),
      ...(properties['mp-syndicate-to'] && {
        'mp-syndicate-to': properties['mp-syndicate-to'],
      }),
    }
    let frontmatter = YAML.stringify(properties)
    frontmatter = `---\n${frontmatter}---\n`

    return frontmatter + content
  }
}
