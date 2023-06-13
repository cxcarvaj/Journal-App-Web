import { uploadFile } from '../../src/helpers/uploadFile';

jest.mock('../../src/helpers/uploadFile', () => ({
  uploadFile: jest
    .fn()
    .mockResolvedValue(
      'https://res.cloudinary.com/djxhcwowp/image/upload/v1628586219/image.png'
    )
}));

describe('Tests for uploadFile helper', () => {
  it('should upload a file to Cloudinary and return the url', async () => {
    const imageUrl =
      'https://companiesmarketcap.com/img/company-logos/256/GLOB.png';

    const response = await fetch(imageUrl);

    const blob = await response.blob();

    const file = new File([blob], 'image.png', { type: 'image/png' });

    const url = await uploadFile(file);

    expect(uploadFile).toHaveBeenCalled();
    expect(typeof url).toBe('string');
  });
});
