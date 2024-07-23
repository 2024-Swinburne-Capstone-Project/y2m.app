import { HomeConfig } from '@/types';

export const homeConfig: HomeConfig = {
  mainTitle: {
    words: [
      { text: 'اطلق العنان' },
      { text: 'اكتشف' },
      { text: 'حقق' },
      { text: 'انتصر' },
      { text: 'افتح' },
      { text: 'أدرك' },
      { text: 'أتم' },
      { text: 'خقق أقصى قدر' },
    ],
    staticText: { text: '!إمكانياتك' },
  },
  subtitle: {
    text: 'منصة لتوجيه الند للند والتنمية الشخصية',
  },
  heroImage: {
    src: '/paper-plane.svg',
    alt: '',
    width: 300,
    height: 300,
  },
  perks: {
    title: 'ماذا نقدم؟',
    items: [
      {
        title: { text: 'مجاني للاستخدام' },
        imagePath: './work-from-home.svg',
      },
      {
        title: { text: 'تعلم من المتخصصين في المجال' },
        imagePath: '/businessman-with-a-suitcase.svg',
      },
      {
        title: { text: 'ساعد الآخرين' },
        imagePath: '/creative-work.svg',
      },
    ],
  },
  introVideo: {
    title: 'من نحن',
    videoUrl: 'https://www.youtube.com/embed/Iv41XbkORAA?si=0TWReHSOKVsf5H8Q&rel=0',
  },
  features: {
    title: 'ما تستطيع فعله',
    items: [
      {
        title: { text: 'تحديد وتتبع الأهداف' },
        description: {
          text: 'لدى أنت2معلم مركز التطوير الخاص بي حيث يمكنك تعيين وتتبع التقدم المحرز في أهداف التطوير الخاصة بك',
        },
        imagePath: '/success.svg',
      },
      {
        title: { text: 'البحث عن مرشدين' },
        description: {
          text: 'يمكنك البحث عن مرشد لتحقيق النمو الشخصي الشامل أو العثور على مجموعة من المرشدين الذين يناسبون أهدافًا محددة',
        },
        imagePath: '/team-idea.svg',
      },
      {
        title: { text: 'إرشد الاخرين' },
        description: {
          text: 'إن توجيه الآخرين لا يدعم تطوير المتدربين فحسب، بل يوفر للموجهين خبرات في أن يصبحوا خبراء في الموضوع ويزيد بشكل كبير من فرص النمو الوظيفي.',
        },
        imagePath: '/shaking-hands.svg',
      },
      {
        title: { text: 'التوجيه العكسي' },
        description: {
          text: 'إرشاد والتواصل مع القادة الذين يرغبون في المشاركة في التوجيه العكسي لاكتساب وجهات نظر جديدة',
        },
        imagePath: '/creative-work.svg',
      },
    ],
  },
  mentorBenefits: {
    title: 'لماذا يجب أن تكون مرشداً',
    imagePath: '/analysis-presentation.svg',
    items: [
      {
        description: {
          text: 'احتمال الحصول على ترقية أكبر بـ 6 مرات من أي شخص ليس مرشداً',
        },
        imagePath: '/product-launch.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'من المرجح أن يحصل 28% على زيادة في الراتب مقارنة بـ 5% من غير الموجهين',
        },
        imagePath: '/spending-money.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'الاعتراف كخبير في الموضوع وقائد',
        },
        imagePath: '/shaking-hands.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'فرصة للتطوير والدفاع عن الآخرين',
        },
        imagePath: '/man-calling.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'تطوير قيادتك الشخصية وأساليب التدريب',
        },
        imagePath: '/creative-work.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
    ],
  },
  menteeBenefits: {
    title: 'لماذا يجب أن يكون لديك مرشد',
    items: [
      {
        title: { text: 'تعلم شيئاً جديداً' },
        description: {
          text: 'إن وجود مرشد خارج شركتك أو حتى ليس في مجال عملك المباشر يمكن أن يساعدك في الوصول إلى المعرفة التي ربما لم تكن تعلم أنك تفوتها',
        },
        imagePath: '/studying.svg',
      },
      {
        title: { text: 'النمو الوظيفي' },
        description: {
          text: 'تظهر الأبحاث أن احتمال حصولك على ترقية هو 5 مرات أكثر واحتمال حصولك على زيادة بنسبة 25% أكثر من أي شخص ليس لديه مرشد',
        },
        imagePath: '/celebrating-business-success.svg',
      },
      {
        title: { text: 'إرشاد' },
        description: {
          text: 'يقدم الموجهون تعليقات بناءة وغير متحيزة وتشجيعًا مصممًا لتعزيز المجالات التي تريد تحسينها',
        },
        imagePath: '/shaking-hands.svg',
      },
      {
        title: { text: 'اتصالات الشبكات' },
        description: {
          text: 'يعرض الموجهون عادة السماح للمتدربين باستخدام شبكاتهم. قد يؤدي الاستعانة بمرشد إلى تعزيز قدرتك على اكتشاف اتصالات جديدة، مما قد يؤدي في النهاية إلى فرص جديدة',
        },
        imagePath: '/work-party.svg',
      },
      {
        title: { text: 'المشاركة والتحفيز' },
        description: {
          text: 'يدعم الموجهون التطور المهني والشخصي للشخص ويحفزونك على تحقيق أهدافك',
        },
        imagePath: '/creative-work.svg',
      },
      {
        title: { text: 'حل المشاكل' },
        description: {
          text: 'إذا كانت لديك مشكلة تحتاج إلى حلها، فيمكن أن يقدم لك المرشد نصيحة مفيدة لمعالجة المشكلة أو الخيارات التي يجب مراعاتها',
        },
        imagePath: '/genius.svg',
      },
      {
        title: { text: 'تحديد الأهداف' },
        description: {
          text: 'الموجهون هم الداعمون المثاليون لمحاسبتك إذا كنت بحاجة إلى مساعدة في تطوير الأهداف وتحقيقها. يمكن لمرشدك أن يساعدك على النمو من خلال مساعدتك على تحديد أهداف جديدة وإعطائك التوجيهات بشأن ما يجب عليك فعله بعد ذلك',
        },
        imagePath: '/success.svg',
      },
      {
        title: { text: 'مسؤولية' },
        description: {
          text: 'يحمل الموجهون المتدربين المسؤولية عن أهدافهم. من خلال تتبع التقدم، يساعد المرشد المتدرب على البقاء مركزًا وعلى المسار الصحيح',
        },
        imagePath: '/calculator.svg',
      },
    ],
  },
  testimonials: {
    title: 'الشهادات - التوصيات',
    items: [
      {
        name: { text: 'فلان الفلاني' },
        role: { text: 'مهندس برمجيات' },
        image: '/male-user.png',
        quote: {
          text: 'لقد كان أنت2معلم فعالاً في نمو مسيرتي المهنية. الموجهون على دراية وداعمة',
        },
      },
      {
        name: { text: 'جين سميث' },
        role: { text: 'مدير الإنتاج' },
        image: '/female-user.png',
        quote: {
          text: 'أوصي بشدة باستخدام أنت2معلم لأي شخص يتطلع إلى تطوير مهاراته. إنها منصة مذهلة',
        },
      },
    ],
  },
  acknowledgementOfCountry: {
    title: 'الاعتراف بالبلد',
    text: 'تعترف أنت2معلم بالسكان الأصليين وسكان جزر مضيق توريس باعتبارهم الأوصياء التقليديين على أرضنا - أستراليا. ونحن نعرب عن احترامنا لهم ولثقافاتهم وللشيوخ في الماضي والحاضر والناشئين. إن شعوب وورنجري وي وورنغ وبونورونغ بون وورنغ من شرق كولين هم الأوصياء التقليديون على الأرض التي يقع عليها مكتب أنت2معلم',
  },
};
