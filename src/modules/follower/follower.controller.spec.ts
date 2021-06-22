import { Test, TestingModule } from '@nestjs/testing';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';

describe('FollowerController', () => {
  let controller: FollowerController;

  const mockFollowerService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        status: 'Pending',
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((dto, status) => {
      return {
        id: Date.now(),
        status: status,
        ...dto,
      };
    }),
    delete: jest.fn((dto) => {
      return {
        id: Date.now(),
        status: 'Accepted',
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowerController],
      providers: [FollowerService],
    })
      .overrideProvider(FollowerService)
      .useValue(mockFollowerService)
      .compile();

    controller = module.get<FollowerController>(FollowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a follower', () => {
    const dto = {
      followerId: '8cec14e2-ff7b-4aee-bfb5-b0d862917537',
      targetId: '96f9f1ed-63a2-489d-90ee-37f376b99f51',
    };

    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      status: 'Pending',
      followerId: dto.followerId,
      targetId: dto.targetId,
    });

    expect(mockFollowerService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a follower with status "Accepted"', () => {
    const dto = {
      followerId: '8cec14e2-ff7b-4aee-bfb5-b0d862917537',
      targetId: '96f9f1ed-63a2-489d-90ee-37f376b99f51',
    };

    expect(controller.accept(dto)).toEqual({
      id: expect.any(Number),
      status: 'Accepted',
      ...dto,
    });

    expect(mockFollowerService.update).toHaveBeenCalled();
  });

  it('should update a follower with status "Declined"', () => {
    const dto = {
      followerId: '8cec14e2-ff7b-4aee-bfb5-b0d862917537',
      targetId: '96f9f1ed-63a2-489d-90ee-37f376b99f51',
    };

    expect(controller.decline(dto)).toEqual({
      id: expect.any(Number),
      status: 'Declined',
      ...dto,
    });

    expect(mockFollowerService.update).toHaveBeenCalled();
  });

  it('should delete a follower', () => {
    const dto = {
      followerId: '8cec14e2-ff7b-4aee-bfb5-b0d862917537',
      targetId: '96f9f1ed-63a2-489d-90ee-37f376b99f51',
    };

    expect(controller.delete(dto)).toEqual({
      id: expect.any(Number),
      status: expect.any(String),
      ...dto,
    });

    expect(mockFollowerService.delete).toHaveBeenCalledWith(dto);
  });
});
