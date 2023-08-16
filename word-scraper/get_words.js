const { getWordsList } = require('most-common-words-by-language')
const latinize = require('latinize')
const Kuroshiro = require("kuroshiro").default
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji")
const fs = require('fs')

const kuroshiro = new Kuroshiro()

kuroshiro.init(new KuromojiAnalyzer())
	.then(
		() => Promise.all(getWordsList('japanese', 5000).map(async w => kuroshiro.convert(w, { to: 'romaji'})))
	)
	.then(res => res.filter(w => !Kuroshiro.Util.hasKanji(w)))
	.then(res => res.map(latinize))
	.then(res => res.map(w => w.replace(/[^a-zA-Z0-9]/gi, '')))
	.then(res => res.filter(w => w.length >= 5))
	.then(res => fs.writeFileSync('../data/japanese.txt', res.join('\n')))

;[
	'polish', 'german', 'english',
	'czech', 'slovak', 'italian',
	'spanish', 'french', 'swedish'
].forEach(cat => {
	fs.writeFileSync(
		`../data/${cat}.txt`,
		getWordsList(cat, 5000)
			.map(latinize)
			.filter(w => w.length >= 5)
			.join('\n')
	)
})