const { getWordsList } = require('most-common-words-by-language')
const latinize = require('latinize')
const Kuroshiro = require("kuroshiro").default
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji")
const fs = require('fs')

const kuroshiro = new Kuroshiro()

kuroshiro.init(new KuromojiAnalyzer())
	.then(
		() => Promise.all(getWordsList('japanese', 10000).map(async w => kuroshiro.convert(w, { to: 'romaji'})))
	)
	.then(res => res.filter(w => !Kuroshiro.Util.hasKanji(w)))
	.then(res => res.map(latinize))
	.then(res => res.map(w => w.replace(/[^a-zA-Z0-9']/gi, '').toLowerCase()))
	.then(res => res.filter(w => w.length >= 5))
	.then(res => fs.writeFileSync('../data/common-words/japanese.txt', res.join('\n')))

;[
	'czech', 'dutch', 'english', 'finnish', 'german', 'italian', 
	'norwegian', 'polish', 'portuguese', 'spanish', 'swedish'
].forEach(cat => {
	fs.writeFileSync(
		`../data/common-words/${cat}.txt`,
		getWordsList(cat, 10000)
			.map(latinize)
			.map(w => w.replace(/[^a-zA-Z0-9']/gi, '').toLowerCase())
			.filter(w => w.length >= 5)
			.join('\n')
	)
})