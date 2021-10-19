import React from 'react';
import { Link } from 'react-router-dom';
import type { INoteSection, IQuizAnswer, IUser } from '../../types/models';
import { parseId } from '../../utils/parseId';
import { shuffleArray } from '../../utils/shuffleArray';
import NoteDetail from './NoteDetail';
import SectionActions from './SectionActions';

interface Props {
  idx?: number;
  id: string;
  noteId: string;
  noteTitle: string;
  noteDescription: string;
  noteAuthor: IUser;
  noteCreatedAt: string;
  noteUpdatedAt: string;
  section: INoteSection;
}

const NoteSectionQuiz: React.FC<Props> = ({
  idx,
  id,
  noteId,
  noteTitle,
  noteDescription,
  noteAuthor,
  noteCreatedAt,
  noteUpdatedAt,
  section,
}: Props) => {
  const subtitleId = section?.subtitle ? parseId(section?.subtitle, id) : '';

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          {idx === 0 ? (
            <div className="flex flex-col sm:flex-row mt-10">
              <NoteDetail
                title={noteTitle}
                description={noteDescription}
                author={noteAuthor}
                createdAt={noteCreatedAt}
                updatedAt={noteUpdatedAt}
              />
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                {section.subtitle && (
                  <Link
                    to={`/notes/${noteId}/#${subtitleId}`}
                    className="group"
                    id={subtitleId}
                  >
                    <h3 className="mb-2 text-bold text-xl">
                      {section.subtitle}
                    </h3>
                    <div className="transition-opacity opacity-0 group-hover:opacity-100 w-24 h-1 bg-indigo-300 rounded mt-1 mb-2"></div>
                  </Link>
                )}

                <div>
                  {section.content && (
                    <p className="leading-relaxed text-xl mb-4">
                      {section.content}
                    </p>
                  )}

                  <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
                    <img
                      className="lg:rounded-lg lg:h-full"
                      src={section.file}
                      alt=""
                    />
                  </div>
                </div>

                <SectionActions />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                {section.subtitle && (
                  <Link
                    to={`/notes/${noteId}/#${subtitleId}`}
                    className="group"
                    id={subtitleId}
                  >
                    <h3 className="mb-2 text-bold text-xl">
                      {section.subtitle}
                    </h3>
                    <div className="transition-opacity opacity-0 group-hover:opacity-100 w-24 h-1 bg-indigo-300 rounded mt-1 mb-2"></div>
                  </Link>
                )}

                <div>
                  {section.content && (
                    <p className="leading-relaxed text-xl mb-4">
                      {section.content}
                    </p>
                  )}

                  {/* TODO: quiz answer are not populated to note section */}
                  <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 mb-4">
                    <form className="bg-white lg:rounded-lg">
                      {shuffleArray(section.answers || []).map(
                        (answer: IQuizAnswer) => (
                          <div>
                            <input type="radio" name={subtitleId} />
                            {answer.answer}
                          </div>
                        )
                      )}
                    </form>
                  </div>
                </div>

                <SectionActions />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoteSectionQuiz;
