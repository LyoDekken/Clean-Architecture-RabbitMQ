import { BadRequestException } from '@nestjs/common';
import { Author, Book, Genre } from '../../core/entities';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../../core/dtos';
import { IDataServices } from '../../core/abstracts/IDataServices.abstract';
import { AuthorService } from './author.use-case.service';
import { IGenericAbstract } from '../../core/abstracts/IGenericRepository.abstract';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let dataServices: IDataServices;

  beforeEach(() => {
    dataServices = {
      authors: {
        getByEmail: jest.fn(),
      } as unknown as IGenericAbstract<Author>,
      books: {} as IGenericAbstract<Book>,
      genres: {} as IGenericAbstract<Genre>,
    };
    authorService = new AuthorService(dataServices);
  });

  describe('createNewAuthor', () => {
    it('should create a new author when email is not in use', async () => {
      // Arrange
      const createAuthorDTO: CreateAuthorDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      (dataServices.authors.getByEmail as jest.Mock).mockResolvedValue(
        undefined,
      );

      // Act
      const author = await authorService.createNewAuthor(createAuthorDTO);

      // Assert
      expect(author.name).toEqual(createAuthorDTO.name);
      expect(author.email).toEqual(createAuthorDTO.email);
      expect(author.avatar_url).toEqual('_');
    });

    it('should throw BadRequestException when email is already in use', async () => {
      // Arrange
      const createAuthorDTO: CreateAuthorDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      const existingAuthor: Author = {
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        avatar_url: '_',
      };

      (dataServices.authors.getByEmail as jest.Mock).mockResolvedValue(
        existingAuthor,
      );

      // Act & Assert
      await expect(
        authorService.createNewAuthor(createAuthorDTO),
      ).rejects.toThrow(BadRequestException);
    });

    describe('updateAvatar', () => {
      it('should update the avatar URL of an author', async () => {
        // Arrange
        const newAvatarUrl = 'https://example.com/avatar.png';

        // Act
        const author = await authorService.updateAvatar(newAvatarUrl);

        // Assert
        expect(author.avatar_url).toEqual(newAvatarUrl);
      });
    });

    describe('updateAuthor', () => {
      it('should update the name and email of an author', async () => {
        // Arrange
        const updateAuthorDTO: UpdateAuthorDTO = {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
        };

        // Act
        const author = await authorService.updateAuthor(updateAuthorDTO);

        // Assert
        expect(author.name).toEqual(updateAuthorDTO.name);
        expect(author.email).toEqual(updateAuthorDTO.email);
      });
    });
  });
});
