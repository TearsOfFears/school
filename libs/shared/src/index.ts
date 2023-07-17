// modules
// export * from './modules/shared.module';
// export * from './modules/redis.module';

// services
// export * from './services/shared.service';
// export * from './services/redis-cache.service';

// entities
export * from './entities/base/base.entity';
export * from './entities/user.entity';
export * from './entities/courseUser.entity';
export * from './entities/course.entity';
export * from './entities/payment.entity';
// export * from './entities/friend-request.entity';
// export * from './entities/conversation.entity';
// export * from './entities/message.entity';
// interfaces - user/shared
// export * from './interfaces/user-request.interface';
// export * from './interfaces/user-jwt.interface';
// export * from './interfaces/shared.service.interface';
// interfaces - repository
export * from './interfaces/user.interface';
export * from './interfaces/course.interface';
export * from './interfaces/events.interface';
export * from './interfaces/payment.interface';
// export * from './interfaces/users.repository.interface';
// export * from './interfaces/friend-requests.repository.interface';
// export * from './interfaces/conversations.repository.interface';
// export * from './interfaces/messages.repository.interface';
// base repository
// export * from './repositories/base/base.abstract.repository';
// export * from './repositories/base/base.interface.repository';

// repositories
// export * from './database/repositories/user.repository';
// export * from './repositories/friend-requests.repository';
// export * from './repositories/conversations.repository';
// export * from './repositories/messages.repository';

// interceptors
// export * from './interceptors/user.interceptor';

// decorators
export * from './decorators/user.decorator';

export * from './strategy/jwt.strategy';
// guards
export * from './guards/jwt.guard';

// contracts
export * from './contracts/account/account.login';
export * from './contracts/account/account.register';
export * from './contracts/account/account.user-info';
export * from './contracts/account/account.user-courses';
export * from './contracts/account/account.change-profile';
export * from './contracts/account/account.buy-course';
export * from './contracts/account/account.check-payment';

export * from './contracts/payment/payment.check';
export * from './contracts/payment/payment.generate-link';

export * from './contracts/course/course.generate-link';
export * from './contracts/course/course.create';

// dtos
export * from './dtos/auth';
export * from './dtos/user';
export * from './dtos/course';
