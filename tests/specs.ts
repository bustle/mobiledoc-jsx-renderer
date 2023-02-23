export const SimpleMobiledoc: Mobiledoc = {
  version: '0.3.2',
  atoms: [],
  cards: [],
  markups: [['strong']],
  sections: [
    [
      1,
      'p',
      [
        [0, [], 0, 'Simple '],
        [0, [0], 1, 'mobiledoc'],
        [0, [], 0, '.']
      ]
    ]
  ]
}

export const CardMobiledoc: Mobiledoc = {
  version: '0.3.2',
  atoms: [],
  cards: [
    [
      'image-card',
      {
        src: 'https://placekitten.com/200/100',
        caption: 'Card image of a kitten'
      }
    ]
  ],
  markups: [],
  sections: [[10, 0]]
}

export const specs: [string, Mobiledoc, string][] = [
  ['Empty', { version: '0.3.2', atoms: [], cards: [], markups: [], sections: [] }, ''],
  [
    'Empty Paragraph',
    {
      version: '0.3.2',
      atoms: [],
      cards: [],
      markups: [],
      sections: [[1, 'p', []]]
    },
    '<p></p>'
  ],
  ['Simple', SimpleMobiledoc, '<p>Simple <strong>mobiledoc</strong>.</p>'],
  [
    'Card',
    CardMobiledoc,
    '<figure><img src="https://placekitten.com/200/100"/><figcaption>Card image of a kitten</figcaption></figure>'
  ],
  [
    'All Features',
    {
      version: '0.3.2',
      atoms: [
        [
          'clicker-atom',
          'Click me',
          {
            clicks: 5
          }
        ]
      ],
      cards: [
        [
          'image-card',
          {
            src: 'https://placekitten.com/200/100',
            caption: 'Card image of a kitten'
          }
        ]
      ],
      markups: [
        ['strong'],
        ['em'],
        ['a', ['href', 'https://www.apple.com']],
        ['a', ['href', 'https://www.microsoft.com']],
        ['a', ['href', 'https://google.com']]
      ],
      sections: [
        [1, 'p', [[0, [], 0, 'Paragraph no markups.']]],
        [2, 'https://placekitten.com/200/200'],
        [1, 'p', [[0, [], 0, '^ Image section']]],
        [
          1,
          'p',
          [
            [0, [], 0, 'Markups with '],
            [0, [0], 1, 'bold'],
            [0, [], 0, ' and '],
            [0, [1], 1, 'italic'],
            [0, [], 0, ' and '],
            [0, [0, 1], 2, 'both'],
            [0, [], 0, ' and '],
            [0, [0], 0, 'both '],
            [0, [1], 2, 'unequal'],
            [0, [], 0, '.']
          ]
        ],
        [
          1,
          'p',
          [
            [0, [], 0, 'Text aligned '],
            [0, [1], 1, 'center']
          ],
          ['data-md-text-align', 'center']
        ],
        [
          1,
          'p',
          [
            [0, [], 0, 'Text aligned '],
            [0, [0], 1, 'right']
          ],
          ['data-md-text-align', 'right']
        ],
        [
          1,
          'blockquote',
          [
            [0, [], 0, 'Blockquote with '],
            [0, [1], 1, 'markup'],
            [0, [], 0, '.']
          ]
        ],
        [
          1,
          'h1',
          [
            [0, [], 0, 'Heading '],
            [0, [1], 1, 'H1']
          ]
        ],
        [
          1,
          'h2',
          [
            [0, [], 0, 'Heading '],
            [0, [0], 1, 'H2']
          ]
        ],
        [
          1,
          'p',
          [
            [0, [], 0, 'Testing a '],
            [0, [2], 1, 'link'],
            [0, [], 0, ' '],
            [0, [1], 0, 'and '],
            [0, [3], 2, 'another'],
            [0, [], 0, '.']
          ]
        ],
        [
          3,
          'ul',
          [
            [
              [0, [], 0, 'Unordered List '],
              [0, [0], 1, 'Item 1']
            ],
            [
              [0, [], 0, 'Unordered '],
              [0, [1], 1, 'List'],
              [0, [], 0, ' Item '],
              [0, [0], 1, '2']
            ]
          ]
        ],
        [
          3,
          'ol',
          [
            [
              [0, [], 0, 'Ordered list '],
              [0, [0], 1, 'A']
            ],
            [
              [0, [4], 1, 'Ordered'],
              [0, [], 0, ' list B']
            ]
          ]
        ],
        [
          1,
          'p',
          [
            [0, [], 0, 'A custom '],
            [0, [0], 1, 'atom'],
            [0, [], 0, ' '],
            [1, [], 0, 0],
            [0, [], 0, ' inline.']
          ]
        ],
        [10, 0],
        [1, 'p', []],
        [1, 'p', [[0, [], 0, 'An empty section ^']]],
        [1, 'p', [[0, [], 0, 'The end.']], ['data-md-text-align', 'left']]
      ]
    },
    `<p>Paragraph no markups.</p><img src="https://placekitten.com/200/200"/><p>^ Image section</p><p>Markups with <strong>bold</strong> and <em>italic</em> and <strong><em>both</em></strong> and <strong>both <em>unequal</em></strong>.</p><p data-md-text-align="center">Text aligned <em>center</em></p><p data-md-text-align="right">Text aligned <strong>right</strong></p><blockquote>Blockquote with <em>markup</em>.</blockquote><h1>Heading <em>H1</em></h1><h2>Heading <strong>H2</strong></h2><p>Testing a <a target="_blank" href="https://www.apple.com">link</a> <em>and <a target="_blank" href="https://www.microsoft.com">another</a></em>.</p><ul><li>Unordered List <strong>Item 1</strong></li><li>Unordered <em>List</em> Item <strong>2</strong></li></ul><ol><li>Ordered list <strong>A</strong></li><li><a target="_blank" href="https://google.com">Ordered</a> list B</li></ol><p>A custom <strong>atom</strong> <span data-clicks="5">Click me</span> inline.</p><figure><img src="https://placekitten.com/200/100"/><figcaption>Card image of a kitten</figcaption></figure><p></p><p>An empty section ^</p><p data-md-text-align="left">The end.</p>`
  ]
]
