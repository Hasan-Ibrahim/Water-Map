using System.Linq;
using Data.Utility;
using Lucene.Net.Analysis;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;
using System.Collections.Generic;
using System.IO;
using NServiceKit.Text;

namespace Data.Repositories
{
    public class KeywordRepository
    {
        private readonly DirectoryInfo _directoryInfo;
        private readonly Analyzer _analyzer;
        private IndexWriter _indexWriter;
        private FSDirectory _directory;
        public KeywordRepository(string keywordIndexDirectory)
        {
            _directoryInfo = new DirectoryInfo(keywordIndexDirectory);
            _analyzer = new StandardAnalyzer(Version.LUCENE_30);
        }

        public void CreateIndex(IEnumerable<Document> documents)
        {
            using (_directory = FSDirectory.Open(_directoryInfo))
            {
                using (_indexWriter = new IndexWriter(_directory, _analyzer, true, IndexWriter.MaxFieldLength.UNLIMITED))
                {
                    foreach (var document in documents)
                    {
                        _indexWriter.AddDocument(document);
                    }
                    _indexWriter.Optimize();
                    _indexWriter.Flush(true, true, true);
                }
            }
        }

        public void AddDocument(Document document)
        {
            using (_directory = FSDirectory.Open(_directoryInfo))
            {
                using (_indexWriter = new IndexWriter(_directory, _analyzer, true, IndexWriter.MaxFieldLength.UNLIMITED))
                {
                    _indexWriter.AddDocument(document);
                    _indexWriter.Optimize();
                    _indexWriter.Flush(true, true, true);
                }
            }
        }

        public SearchedKeywords GetKeywords(int userId)
        {
            var queryParser = new QueryParser(Version.LUCENE_30, "UserId", _analyzer);
            var parsedQuery = queryParser.Parse(userId.ToString("D"));

            return GetSearchResult(parsedQuery);
        }

        private SearchedKeywords GetSearchResult(Query query)
        {
            using (_directory = FSDirectory.Open(_directoryInfo))
            {
                TopScoreDocCollector collector = TopScoreDocCollector.Create(1000, true);
                var searcher = new IndexSearcher(_directory, true);

                searcher.Search(query, collector);
                var topDocs = collector.TopDocs(1, 10);

                var documents = topDocs.ScoreDocs.Select(hit => searcher.Doc(hit.Doc).Get("Keyword"));

                return new SearchedKeywords
                {
                    Keywords = documents.Join(" "),
                    TotalResults = topDocs.TotalHits
                };
            }
        }
    }
}
