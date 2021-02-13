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
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
        media: {
          path: 'src/_img/{yyyy}-{MM}-{dd}-{filename}',
        },
      },
      {
        type: 'video',
        name: 'Video',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
        media: {
          path: 'src/_img/{yyyy}-{MM}-{dd}-{filename}',
        },
      },
      {
        type: 'audio',
        name: 'Audio',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
        media: {
          path: 'src/_img/{yyyy}-{MM}-{dd}-{filename}',
        },
      },
      {
        type: 'bookmark',
        name: 'Bookmark',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
      },
      {
        type: 'checkin',
        name: 'Checkin',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
      },
      {
        type: 'event',
        name: 'Event',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
      },
      {
        type: 'rsvp',
        name: 'Reply with RSVP',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
      },
      {
        type: 'reply',
        name: 'Reply',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
      },
      {
        type: 'repost',
        name: 'Repost',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
        },
      },
      {
        type: 'like',
        name: 'Like',
        post: {
          path: 'src/b/{slug}.md',
          url: 'b/{slug}',
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
      date: properties.published.substring(0, 10), // substring to take only published date
      ...(properties.name && { title: properties.name }),
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
